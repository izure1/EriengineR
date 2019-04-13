<template>
  <section v-if="isReady">
    <v-card v-for="(section, index) in getAttributeSections" :key="index">
      <v-card-title class="headline">{{ section.name }}</v-card-title>
      <v-card-text>
        이 디자인으로 만들어진 객체가 <span class="light-green--text">기본적으로 가질</span> {{ section.name }}을 정의합니다.
        <br>
        위에서 선언한 <span class="light-green--text">｛{ 변수명 }｝</span> 형식으로 입력하면 변수를 수정함으로써, 객체의 {{ section.name }}을 변경할 수
        있습니다.
      </v-card-text>
      <v-list two-line>
        <v-list-tile v-for="(value, prop) in getAttributeProperties(section.type)" :key="prop"
          @click="setModifyItem(prop, section.type)">
          <v-list-tile-avatar>
            <span class="grey--text title">{{ getPropertySymbol(prop) }}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="light-green--text" :title="prop">
              {{ getPropertyName(prop, section.type) }}
              <span class="grey--text caption ml-2" v-html="getPreviewValue(value)"></span>
              <span v-if="section.type === 'style'" class="ml-2">
                <span class="grey--text caption" v-html="getPreviewDuration(prop)"></span>
              </span>
            </v-list-tile-title>
            <v-list-tile-sub-title class="information-description">
              {{ getDescription(prop, section.type) }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
    <!-- 모달 데이터 수정 -->
    <v-dialog max-width="50%" v-model="modifyMode">
      <v-card class="pa-3">
        <v-text-field label="값을 입력하세요" clearable :hint="getValueSample(modifyProperty, modifyType)"
          v-model="modifyValue"></v-text-field>
        <v-text-field label="값이 변경될 때, 스타일이 몇 초에 걸쳐서 변화되는지 입력해주세요." clearable v-model="duration[modifyProperty]"
          v-if="isStyle">
        </v-text-field>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'
  import LveJS from 'lve'

  import DESIGN_ATTRIBUTE from './js/DESIGN_ATTRIBUTE'
  import DESIGN_STYLE from './js/DESIGN_STYLE'

  import SuppressJob from '@static/js/class/SuppressJob'
  import REGEXP from '@/assets/js/REGEXP'


  export default {

    props: ['data', 'requestReadFile'],
    data: () => ({

      lve: new LveJS,
      suppressJob: new SuppressJob,

      attribute: null,
      style: null,
      duration: null,

      attribute_information: DESIGN_ATTRIBUTE,
      style_information: DESIGN_STYLE,

      modifyMode: false,
      modifyProperty: null,
      modifyValue: null,
      modifyType: null

    }),

    computed: {

      getAttributeSections() {

        return [{
            name: '속성',
            type: 'attribute'
          },
          {
            name: '스타일',
            type: 'style'
          }
        ]

      },

      isReady() {
        return this.attribute && this.style && this.duration
      },

      isStyle() {
        return this.modifyType === 'style'
      }

    },

    methods: {

      copyJSON(o) {
        return JSON.parse(JSON.stringify(o))
      },

      getAttributeProperties(name) {
        return this[name]
      },

      getPropertySymbol(p) {

        // Get Mathematical Italic character from first letter
        p = p.substr(0, 1)
        p = p.charCodeAt() + 119789
        p = String.fromCodePoint(p)

        return p

      },

      getPropertyInformation(type) {
        return this[type + '_information']
      },

      getPropertyName(p, type) {

        let information = this.getPropertyInformation(type)

        if (p in information) {
          return information[p].name
        }

        return p

      },

      getDescription(p, type) {

        let sample
        let information

        sample = ''
        information = this.getPropertyInformation(type)

        if (p in information) {

          if ('description' in information[p]) {
            sample = information[p].description
          }

          return sample

        }

      },

      getValueSample(p, type) {

        let sample
        let information


        if (!p || !type) {
          return ''
        }

        sample = ''
        information = this.getPropertyInformation(type)

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

        v = v.replace(REGEXP.variable, '<span class="yellow--text">$1</span>')

        return v

      },

      getPreviewDuration(p) {

        let v

        v = this.duration[p] || ''
        v += ''

        v = v.replace(REGEXP.variable, '<span class="yellow--text">$1</span>')

        if (v) {
          v = `/${v}s`
        }

        return v

      },

      setModifyItem(property, type) {

        this.modifyProperty = property
        this.modifyType = type
        this.modifyValue = this[type][property]

        this.modifyMode = true

      },

      getInformation(p) {

        let information
        let attribute
        let style
        let dataset
        let duration

        information = this.requestReadFile()

        // Copy JSON
        attribute = this.copyJSON(information)
        style = this.copyJSON(information).style
        dataset = this.copyJSON(information).dataset
        duration = this.copyJSON(information).__duration

        // Delete unuseful properties
        delete attribute.type
        delete attribute.style
        delete attribute.dataset
        delete attribute.__id
        delete attribute.__duration
        delete attribute.__asset
        delete attribute.__assetSrc
        delete attribute.__spot

        this.attribute = attribute
        this.style = style
        this.dataset = dataset
        this.duration = duration

      },

      getUsefulDuration() {

        let duration = this.copyJSON(this.duration)

        // Append duration properties
        for (let p in duration) {

          if (isNaN(duration[p] - 0)) {
            continue
          }

          if (duration[p] > 0) {
            continue
          }

          delete duration[p]

        }

        return duration

      },

      saveValue(type, property, value) {
        this[type][property] = value
      },

      saveFile() {

        let raw

        this.suppressJob.set('save', () => {

          raw = this.requestReadFile()

          raw = Object.assign(raw, this.attribute)
          raw.style = this.style
          raw.__duration = this.getUsefulDuration()

          // Save file
          fs.writeJSONSync(this.data.path, raw, {
            spaces: 2
          })

          // Reload data from file
          this.getInformation(this.data.path)

        }, 300)

      },

    },

    created() {

      this.getInformation(this.data.path)

    },

    watch: {

      modifyValue() {
        this.saveValue(this.modifyType, this.modifyProperty, this.modifyValue)
      },

      attribute: {

        deep: true,
        handler() {
          this.saveFile()
        }

      },

      style: {

        deep: true,
        handler() {
          this.saveFile()
        }

      },

      duration: {

        deep: true,
        handler() {
          this.saveFile()
        }

      }

    }

  }
</script>

<style lang="scss" scoped>
  .information-description {
    font-size: small;
  }
</style>