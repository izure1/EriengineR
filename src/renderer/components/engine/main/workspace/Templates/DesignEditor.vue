<template>
  <section class="template-designeditor">
    <v-card v-for="(section, target) in information.status" :key="target" class="section-wrap" :loading="isSaving">
      <v-card-title class="headline">{{ getTargetName(target) }}</v-card-title>
      <v-card-text>
        <p class="body-2" v-if="target !== 'dataset'">
          이 디자인으로 만들어진 객체가 <span class="light-green--text">기본적으로 가질</span> {{ getTargetName(target) }} 를(을) 정의합니다.
          <br>
          Dataset 에서 선언한 변수를 <span class="light-green--text">｛{ 변수명 }｝</span> 형식으로 입력하면, 객체의 {{ getTargetName(target) }}
          를(을) 변경할 수 있습니다.
        </p>
        <p class="body-2" v-else>
          이곳에서 객체의 변수를 관리하세요. 이 변수를 수정하여, 다른 속성값들을 관리할 수도 있습니다.
        </p>
      </v-card-text>
      <v-divider v-if="!hasProperties(section)"></v-divider>
      <v-list two-line>
        <v-list-item v-for="(value, property) in section" :key="property"
          @click="showModifyWindow(target, property, value)">
          <v-list-item-content>
            <v-list-item-title class="designeditor-property-name">
              <span class="font-weight-medium">{{ property }}</span>
              <span class="caption grey--text ml-3">{{ getPropertyDescription(target, property) }}</span>
            </v-list-item-title>
            <v-list-item-subtitle class="caption light-green--text">{{ value + '' }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon small @click.stop="deleteProperty(target, property)">
              <v-icon>delete</v-icon>
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
        <v-card-text>
          {{ getPropertyDescription(modifyInformation.target, modifyInformation.property) }}
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
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import createItem from '@common/js/createItem'

  import DESIGN_DESCRIPTION_STYLE from './js/DESIGN_DESCRIPTION_STYLE'
  import DESIGN_DESCRIPTION_ATTRIBUTE from './js/DESIGN_DESCRIPTION_ATTRIBUTE'
  import DESIGN_DESCRIPTION_POSITION from './js/DESIGN_DESCRIPTION_POSITION'

  export default {

    components: {},
    props: ['data'],
    data: () => ({
      watcher: null,
      isSaving: false,
      information: null,
      modifyMode: false,
      modifyInformation: {
        target: null,
        property: null,
        propertyOrigin: null,
        value: null,
      },
      description: {
        style: DESIGN_DESCRIPTION_STYLE,
        attribute: DESIGN_DESCRIPTION_ATTRIBUTE,
        position: DESIGN_DESCRIPTION_POSITION,
      }
    }),

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

        Object.assign(information, saveData)

        this.isSaving = true

        fs.writeJSONSync(this.data.path, information, {
          spaces: 2
        })

      },

      hasProperties(section) {
        return !!Object.keys(section)
      },

      addProperty(target) {

        let properties
        let propertyName

        let information

        properties = Object.keys(this.information.status[target])
        information = JSON.stringify(this.information)
        information = JSON.parse(information)

        propertyName = '새로운_속성'
        propertyName = createItem(properties, propertyName)

        information.status[target][propertyName] = null
        this.saveFile(information)

      },

      deleteProperty(target, property) {

        let information = this.readFromFile()

        delete information.status[target][property]

        this.saveFile(information)

      },

      modifyProperty(target, property, value) {

        let information = this.readFromFile()

        try {

          if (!window.hasOwnProperty(value)) {
            value = eval(`(${value})`)
          }

        } catch (e) {}

        information.status[target][property] = value

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

      watchHandler() {
        this.information = this.readFromFile()
        this.isSaving = false
      },

      watchFile() {
        this.watcher = fs.watch(this.data.path, this.watchHandler)
      },

      readFromFile() {

        let information

        information = fs.readJSONSync(this.data.path)
        information = information

        return information

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