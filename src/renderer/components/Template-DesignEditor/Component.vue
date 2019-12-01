<template>
  <section class="template-designeditor">
    <v-card v-for="(section, target) in information.component" :key="target" class="section-wrap" :loading="isSaving">
      <v-card-title class="headline">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn text @click="showAllProperties(target)" v-on="on">{{ getTargetName(target) }}</v-btn>
          </template>
          <span>이 컴포넌트에서 사용할 수 있는 모든 속성들을 봅니다</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <p class="body-2" v-if="target !== 'dataset'">
          이 디자인으로 만들어진 객체가 <span class="light-green--text">기본적으로 가질</span> {{ getTargetName(target) }} 를(을) 정의합니다.
          <br>
          Dataset 에서 선언한 변수를 <span class="light-green--text">｛{ 변수명 }｝</span> 형식으로 입력하면, 객체의 {{ getTargetName(target) }}
          를(을) 변경할 수 있습니다.
        </p>
        <p class="body-2" v-else>이곳에서 객체의 변수를 관리하세요. 이 변수를 수정하여, 다른 속성값들을 관리할 수도 있습니다.</p>
      </v-card-text>
      <v-divider v-if="!hasProperties(section)"></v-divider>
      <v-list two-line>
        <v-list-item v-for="(value, property) in getSortedProperties(section)" :key="property"
          @click="showModifyWindow(target, property, value)">
          <v-list-item-content>
            <v-list-item-title class="designeditor-property-name">
              <span class="font-weight-medium">{{ property }}</span>
              <span class="caption grey--text ml-3" v-html="getPropertyDescription(target, property)"></span>
            </v-list-item-title>
            <v-list-item-subtitle class="caption light-green--text">{{ value + '' }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon small @click.stop="deleteProperty(target, property)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="addProperty(target)">
          <v-list-item-icon>
            <v-icon>add</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>추가하기</v-list-item-title>
            <v-list-item-subtitle class="caption">새로운 속성을 만듭니다</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="modifyMode">
      <v-card v-if="modifyInformation.target">
        <v-card-title>{{ getTargetName(modifyInformation.target) }}</v-card-title>
        <v-card-text v-html="getPropertyDescription(modifyInformation.target, modifyInformation.property)">
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field label="속성명을 입력해주세요" v-model="modifyInformation.property"></v-text-field>
            <v-text-field label="초기값을 입력해주세요" v-model="modifyInformation.value"
              :hint="getPropertyValids(modifyInformation.target, modifyInformation.property)"></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="propsInfoMode" max-width="60%">
      <v-card v-if="propsInformation">
        <v-card-title>{{ getTargetName(propsInformation) }}</v-card-title>
        <v-card-text v-if="Object.keys(propsInformationList).length" class="subtitle-2">
          <p>사용할 수 있는 모든 속성을 확인하세요. 클릭하여 컴포넌트에 추가할 수 있습니다.</p>
          <v-divider></v-divider>
          <v-list two-line>
            <v-list-item v-for="(value, property) in propsInformationList" :key="property"
              @click="addProperty(propsInformation, property)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-list-item-content v-on="on">
                    <v-list-item-title class="designeditor-property-name">
                      <span class="font-weight-medium">{{ property }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption grey--text"
                      v-html="getPropertyDescription(propsInformation, property)"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <span>클릭하여 이 속성을 추가합니다</span>
              </v-tooltip>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text v-else>
          <p class="headline text-center my-5 grey--text">추가할 수 있는 속성이 없습니다</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import fs from 'fs-extra'

  import GameObject from '@game/designs/parents/GameObject'
  import createItem from '@common/js/createItem'

  import DESIGN_LISTS from '@game/designs/vars/DESIGN_LISTS'
  import DesignParser from '@game/designs/DesignParser'
  import DESIGN_DESCRIPTION_STYLE from './vars/DESIGN_DESCRIPTION_STYLE'
  import DESIGN_DESCRIPTION_ATTRIBUTE from './vars/DESIGN_DESCRIPTION_ATTRIBUTE'
  import DESIGN_DESCRIPTION_POSITION from './vars/DESIGN_DESCRIPTION_POSITION'
  import DESIGN_DESCRIPTION_VIDEOSET from './vars/DESIGN_DESCRIPTION_VIDEOSET'
  import DESIGN_DESCRIPTION_SPRITESET from './vars/DESIGN_DESCRIPTION_SPRITESET'
  import DESIGN_DESCRIPTION_PARTICLESET from './vars/DESIGN_DESCRIPTION_PARTICLESET'
  import DESIGN_DESCRIPTION_SPRITEANIMATION from './vars/DESIGN_DESCRIPTION_SPRITEANIMATION'

  export default {

    components: {},
    props: ['data'],
    data: () => ({
      watcher: null,
      isSaving: false,
      information: null,
      modifyMode: false,
      propsInfoMode: false,
      modifyInformation: {
        target: null,
        property: null,
        propertyOrigin: null,
        value: null,
      },
      propsInformation: null,
      description: {
        style: DESIGN_DESCRIPTION_STYLE,
        attribute: DESIGN_DESCRIPTION_ATTRIBUTE,
        position: DESIGN_DESCRIPTION_POSITION,
        videoset: DESIGN_DESCRIPTION_VIDEOSET,
        spriteset: DESIGN_DESCRIPTION_SPRITESET,
        particleset: DESIGN_DESCRIPTION_PARTICLESET,
        sprite: DESIGN_DESCRIPTION_SPRITEANIMATION,
      }
    }),

    computed: {

      propsInformationList() {
        return this.description[this.propsInformation] || {}
      }

    },

    methods: {

      getTargetName(target) {

        let firstLetter, tail

        firstLetter = target.substr(0, 1)
        tail = target.substr(1, target.length)

        firstLetter = firstLetter.toUpperCase()

        return firstLetter + tail

      },

      saveFile(saveData) {

        let information

        information = this.readFromFile()
        information = {
          ...information,
          ...saveData
        }

        this.isSaving = true

        fs.writeJSONSync(this.data.path, information, {
          spaces: 2
        })

      },

      hasProperties(section) {
        return !!Object.keys(section)
      },

      getSortedProperties(section) {

        let map
        let keys

        map = new Map
        keys = Object.keys(section).sort()

        for (let k of keys) {
          map.set(k, section[k])
        }


        let info = {}

        for (let [property, value] of map.entries()) {
          info[property] = value
        }

        return info

      },

      addProperty(target, name = '새로운_속성', value = null) {

        let properties
        let propertyName

        let information

        properties = Object.keys(this.information.component[target])
        information = JSON.stringify(this.information)
        information = JSON.parse(information)

        propertyName = name
        propertyName = createItem(properties, propertyName)

        information.component[target][propertyName] = value
        this.saveFile(information)

      },

      deleteProperty(target, property) {

        let information = this.readFromFile()

        delete information.component[target][property]

        this.saveFile(information)

      },

      modifyProperty(target, property, value) {

        let information = this.readFromFile()

        try {

          if (!window.hasOwnProperty(value)) {
            value = eval(`(${value})`)
          }

        } catch (e) {}

        information.component[target][property] = value

        this.saveFile(information)

      },

      showModifyWindow(target, property, value) {

        let propertyOrigin

        propertyOrigin = property
        value = value + ''

        this.modifyMode = true
        this.modifyInformation = {
          target,
          property,
          propertyOrigin,
          value,
        }

      },

      hasDescription(target, property) {

        target = target.toLowerCase()

        if (!this.description.hasOwnProperty(target)) {
          return false
        }
        if (!this.description[target].hasOwnProperty(property)) {
          return false
        }

        return true

      },

      getPropertyDescription(target, property) {

        if (!this.hasDescription(target, property)) {
          return ''
        }

        return this.description[target][property].description

      },

      getPropertyValids(target, property) {

        if (!this.hasDescription(target, property)) {
          return ''
        }

        return '입력 가능한 값 : ' + this.description[target][property].valids.join(', ')

      },

      showAllProperties(section) {
        this.propsInfoMode = true
        this.propsInformation = section
      },

      watchHandler() {
        this.information = this.readFromFile()
        this.isSaving = false
      },

      watchFile() {
        this.watcher = fs.watch(this.data.path, this.watchHandler)
      },

      readFromFile() {

        let designOrigin, DesignFactory, designObj
        let parser, design

        parser = new DesignParser

        designOrigin = fs.readJSONSync(this.data.path)
        DesignFactory = parser.getFactoryFromDesign(designOrigin)

        designObj = new DesignFactory
        designObj.from(designOrigin)

        return designObj

      }

    },

    watch: {

      modifyMode() {

        if (this.modifyMode) {
          return
        }

        let {
          target,
          property,
          propertyOrigin,
          value
        } = this.modifyInformation

        this.deleteProperty(target, propertyOrigin)
        this.modifyProperty(target, property, value)

      }

    },

    created() {
      this.watchFile()
      this.watchHandler()
    },

    destroyed() {
      this.watcher.close()
    }

  }
</script>

<style lang="scss" scoped>
  .template-designeditor {
    padding: 30px;
  }

  .section-wrap {
    margin: 20px 0;
  }
</style>