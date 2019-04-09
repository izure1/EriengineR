<template>
  <section v-if="isReady">
    <v-card v-for="(section, index) in getAttributeList" :key="index" class="my-5">
      <v-card-title class="headline">{{ section.name }}</v-card-title>
      <v-card-text>
        이 디자인으로 만들어진 객체가 <span class="light-green--text">기본적으로 가질</span> {{ section.name }}을 정의합니다.
        <br>
        위에서 선언한 <span class="light-green--text">｛{ 변수명 }｝</span> 형식으로 입력하면 변수를 수정함으로써, 객체의 {{ section.name }}을 변경할 수
        있습니다.
      </v-card-text>
      <v-list two-line>
        <v-list-tile v-for="(value, prop) in section.data" :key="prop"
          @click="setModifyItem(prop, section.data, section.information, section.type)">
          <v-list-tile-avatar>
            <span class="grey--text title">{{ getPropertySymbol(prop) }}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="light-green--text" :title="prop">
              {{ getPropertyName(prop, section.information) }}<span class="grey--text caption ml-2" v-html="getPreviewValue(value)"></span>
            </v-list-tile-title>
            <v-list-tile-sub-title class="information-description">
              {{ getDescription(prop, section.information) }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
    <!-- 모달 데이터 수정 -->
    <v-dialog max-width="50%" v-model="modifyMode">
      <v-card class="pa-3">
        <v-text-field label="값을 입력하세요" v-if="modify" :hint="getValueSample(modify.property, modify.information)"
          :value="modify.data[modify.property]" @change="saveFile"></v-text-field>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'
  import Lve from 'lve'

  import DESIGN_ATTRIBUTE from './js/DESIGN_ATTRIBUTE'
  import DESIGN_STYLE from './js/DESIGN_STYLE'

  export default {

    props: ['data', 'requestReadFile'],
    data: () => ({
      lve: new Lve,
      attribute: null,
      style: null,
      modifyMode: false,
      modify: null,
      DESIGN_ATTRIBUTE,
      DESIGN_STYLE
    }),

    computed: {

      getAttributeList() {

        return [{
            name: '속성',
            type: 'attribute',
            data: this.attribute,
            information: this.DESIGN_ATTRIBUTE
          },
          {
            name: '스타일',
            type: 'style',
            data: this.style,
            information: this.DESIGN_STYLE
          }
        ]

      },

      isReady() {
        return this.attribute && this.style
      }

    },

    methods: {

      copyJSON(o) {
        return JSON.parse(JSON.stringify(o))
      },

      getPropertySymbol(p) {

        // Get Mathematical Italic character from first letter
        p = p.substr(0, 1)
        p = p.charCodeAt() + 119789
        p = String.fromCodePoint(p)

        return p

      },

      getPropertyName(p, information) {

        if (p in information) {
          return information[p].name
        }

        return p

      },

      getDescription(p, information) {

        let sample = ''

        if (p in information) {

          if ('description' in information[p]) {
            sample = information[p].description
          }

          return sample

        }

      },

      getValueSample(p, information) {

        let sample = ''

        if (p in information) {

          if ('list' in information[p]) {
            sample = '입력 가능한 목록: ' + information[p].list.join(', ') + ' 중 선택'
          }

        }

        return sample

      },

      getPreviewValue(v) {
        
        v += ''

        if (v === '') {
          v = '“”'
        }

        v = v.replace(/\{{2}(?!\{)\s*(.*?)\s*\}{2}/gmi, '<span class="yellow--text mx-1">$1</span>')

        return v

      },

      setModifyItem(property, data, information, type) {

        this.modify = {
          property,
          data,
          information,
          type
        }
        this.modifyMode = true

      },

      getInformation(p) {

        let sample

        let information
        let attribute
        let style
        let dataset


        sample = this.lve.createObject('__sample__', {
          type: 'image'
        })

        information = this.requestReadFile()
        information = Object.assign({}, sample, information)

        attribute = this.copyJSON(information)
        style = this.copyJSON(information).style
        dataset = this.copyJSON(information).dataset

        delete attribute.name
        delete attribute.src
        delete attribute.scene
        delete attribute.element
        delete attribute.animationset
        delete attribute.dataset
        delete attribute.followset
        delete attribute.physicsset
        delete attribute.spriteset
        delete attribute.style

        delete style.position
        delete style.left
        delete style.bottom
        delete style.perspective
        delete style.gradient
        delete style.gradientDirection
        delete style.gradientType
        delete style.margin

        this.attribute = attribute
        this.style = style
        this.dataset = dataset

      },

      saveFile(v) {

        this.modify.data[this.modify.property] = v

        let raw = this.requestReadFile()

        // Combine with raw data
        switch (this.modify.type) {

          case 'attribute':
            raw = Object.assign(raw, this.modify.data)
            break

          case 'style':
            raw.style = this.modify.data
            break

        }

        // Save file
        fs.writeJSONSync(this.data.path, raw, {
          spaces: 2
        })

        // Reload data from file
        this.getInformation(this.data.path)

      },

    },

    created() {

      this.getInformation(this.data.path)

    }

  }
</script>

<style lang="scss" scoped>
  .information-description {
    font-size: small;
  }
</style>