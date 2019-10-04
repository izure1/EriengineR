<template>
  <section>
    <v-toolbar color="#333">
      <v-toolbar-title class="mr-3">
        <v-icon>widgets</v-icon>
      </v-toolbar-title>
      <v-autocomplete v-model="select" :items="macroLists" item-text="title" return-object flat solo-inverted
        hide-details label="찾고 싶은 매크로를 검색하세요" no-data-text="일치하는 매크로가 없습니다" class="mx-1" @change="setMacro">
      </v-autocomplete>
    </v-toolbar>
    <v-card>
      <section class="pa-5">
        <div class="macro-description-wrap body-2">
          <macro-description v-if="select" :select="select" :macro="macro" @modify="setMacroReturn"></macro-description>
          <div v-else>상단에서 매크로를 선택하세요</div>
        </div>
        <v-card-actions>
          <v-btn :disabled="!macroReturn" @click="sendMacro">
            <v-icon left>done</v-icon> 저장
          </v-btn>
        </v-card-actions>
      </section>
      <section class="macro-footer mt-3 pa-5 body-2">
        <dl v-if="select">
          <dt>작성자</dt>
          <dd class="light-green--text caption">{{ getAuthor }}</dd>
          <dt class="mt-3">홈페이지</dt>
          <dd class="light-green--text caption">{{ getHomepage }}</dd>
        </dl>
      </section>
    </v-card>
  </section>
</template>

<script>
  import {
    ipcRenderer
  } from 'electron'

  import createUID from '@common/js/createUID'
  import Macro from '@common/js/Macro'

  import MacroDescription from './MacroDescription'

  export default {

    components: {
      MacroDescription
    },

    props: {
      information: Object
    },

    data: () => ({
      select: null,
      macro: null,
      macroColumn: {},
      macroReturn: null,
    }),

    computed: {

      macroLists() {
        return this.macroColumn[this.information.column]
      },

      getAuthor() {

        if (!this.select) {
          return ''
        }

        return this.select.author || 'admin@izure.org'

      },

      getHomepage() {

        if (!this.select) {
          return ''
        }

        return this.select.url || 'https://cafe.naver.com/lvejs'

      }

    },

    methods: {

      getMacroColumn() {
        return ipcRenderer.sendSync('macro-get-list')
      },

      getMacroStorage() {

        let old, select
        let macroInfo

        old = this.information.old
        select = this.select

        macroInfo = {}

        // 새로운 매크로를 생성할 때
        if (!old) {

          macroInfo.id = createUID()
          macroInfo.origin = select.id
          macroInfo.variables = {}

        }
        // 기존의 매크로를 수정할 때
        else {

          macroInfo.id = old.id
          macroInfo.origin = select.id
          macroInfo.variables = old.origin !== select.id ?
            macroInfo.variables = {} : // 기존의 매크로를 수정하지만, 다른 매크로 원형일 때
            macroInfo.variables = old.variables // 기존에 사용하던 매크로 원형 그대로 수정할 때

        }

        let macro

        macro = new Macro
        macro.parseFromInformation(macroInfo)

        return macro

      },

      setMacro() {
        this.macro = this.getMacroStorage()
      },

      setMacroReturn(done, macro) {
        this.macroReturn = done ? macro : null
      },

      sendMacro() {

        if (!this.macroReturn) {
          return
        }

        this.$emit('done', this.macroReturn)

      },

      reset() {
        this.select = null
        this.macro = null
      }

    },

    watch: {

      information() {
        this.select = null
        this.macroReturn = null
      }

    },

    created() {
      this.macroColumn = this.getMacroColumn()
    }

  }
</script>

<style lang="scss" scoped>
  .macro-description-wrap {
    padding: 15px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .macro-footer {
    width: 100%;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>