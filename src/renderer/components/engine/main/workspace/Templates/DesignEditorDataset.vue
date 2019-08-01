<template>
  <section v-if="isReady">
    <v-card class="my-5">
      <v-card-title class="headline">변수</v-card-title>
      <v-card-text>
        이 디자인으로 만들어진 객체가 <span class="light-green--text">기본적으로 가질</span> 변수를 정의합니다.
        <br>
        호감도, HP 등, 객체마다 고유하게 가져야할 변수들을 이곳에서 관리합니다.
      </v-card-text>
      <v-list two-line>
        <v-list-tile v-for="(value, prop) in dataset" :key="prop" @click="setModifyItem(prop)">
          <v-list-tile-avatar>
            <v-icon color="grey">{{ getAvatarSymbol(value) }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="yellow--text">{{ prop }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ value }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click="deleteProperty(prop)">
              <v-icon color="grey">delete_forever</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-card-actions class="px-3">
        <v-btn @click="addVariable" icon>
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
      <v-alert :value="!isEmpty" type="info">
        아직 만들어진 변수가 없습니다.
        <br>
        새로운 변수를 만들고 싶으면 상단 버튼을 눌러 생성하세요.
      </v-alert>
    </v-card>
    <!-- 모달 데이터 수정 -->
    <v-dialog max-width="50%" v-model="modifyMode">
      <v-card class="pa-3" v-if="modify">
        <v-text-field label="변수명을 입력하세요" clearable :value="modify" @change="saveProperty" color="orange"></v-text-field>
        <v-text-field label="초기값을 입력하세요" clearable :value="dataset[modify]" @change="saveValue" color="orange"></v-text-field>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import createItem from '@static/js/createItem'

  export default {

    props: ['data', 'requestReadFile'],
    data: () => ({
      dataset: null,
      modifyMode: false,
      modify: null,
    }),

    computed: {

      isReady() {
        return this.dataset
      },

      isEmpty() {
        return Object.keys(this.dataset).length
      }

    },

    methods: {

      copyJSON(o) {
        return JSON.parse(JSON.stringify(o))
      },

      getAvatarSymbol(v) {

        if (isNaN(v - 0)) {
          // Boolean
          if (v === 'true' || v === 'false') {
            return 'check'
          }
          // String
          return 'text_format'

        } else {

          // Empty
          if (v === '') {
            return 'text_format'
          }
          // Number
          return 'exposure_plus_1'

        }

      },

      setModifyItem(property, data) {

        this.modify = property
        this.modifyMode = true

      },

      addVariable() {

        let name
        let names

        name = '새로운 변수'
        names = Object.keys(this.dataset)

        name = createItem(names, name)

        this.dataset[name] = null

        this.saveFile()

      },

      getInformation(p) {

        let dataset

        dataset = this.requestReadFile()
        dataset = dataset.dataset

        if (!dataset) {
          dataset = {}
        }

        this.dataset = dataset

      },

      saveProperty(v) {

        let value = this.dataset[this.modify]

        delete this.dataset[this.modify]

        this.dataset[v] = value
        this.modify = v

        this.saveFile()

      },

      deleteProperty(v) {

        delete this.dataset[v]
        this.saveFile()

      },

      saveValue(v) {

        this.dataset[this.modify] = v
        this.saveFile()

      },

      saveFile() {

        let obj

        obj = this.requestReadFile()
        obj.dataset = this.dataset

        // Save file
        fs.writeJSONSync(this.data.path, obj, {
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