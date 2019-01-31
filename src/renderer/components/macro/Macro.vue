<template>
  <section>
    <header>
      <div>
        <v-select :items="getMacroList" :hint="current ? `${current.class}` : ''" v-model="current" append-icon="search"
          dense box dark autocomplete height="70" background-color="#444" color="orange" item-text="text" item-value="value"
          label="매크로를 선택하세요" class="macro-selector"></v-select>
      </div>
    </header>
    <main>
      <div class="macro-description-wrap">
        <macro-description v-if="current" :current="current" :macros="getMacroGroup" :variables="variables"></macro-description>
      </div>
      <div class="macro-description-action">
        <v-btn @click="complete" :disabled="!current" dark large>
          <v-icon>save</v-icon>
          저장
        </v-btn>
        <v-btn @click="cancel" dark large>
          <v-icon>delete</v-icon>
          취소
        </v-btn>
      </div>
    </main>
    <footer>
      <div>
        <dl v-if="current">
          <dt>제공자</dt>
          <dd>{{ getMacroAuthor }}</dd>
          <dt>정보</dt>
          <dd>
            <a :href="getMacroURL" target="_blank">{{ getMacroURL }}</a>
          </dd>
        </dl>
      </div>
    </footer>
  </section>
</template>

<script>
  import path from 'path'
  import fs from 'fs-extra'
  import glob from 'glob'
  import electron from 'electron'

  import MacroDescription from './MacroDescription'

  import getMacroList from './js/getMacroList'

  export default {
    components: {
      MacroDescription
    },
    data() {
      return {
        macro: null,
        variables: null,
        current: null
      }
    },
    computed: {

      // events, conditions, actions 중 한 부류의 매크로들을 배열에 담아 반환합니다
      getMacroGroup() {

        let group

        if (!this.macro) {
          return []
        }

        group = this.$route.params.group
        group = this.macro[group]

        return group

      },

      getMacroList() {
        return getMacroList(this.getMacroGroup)
      },

      // 매크로 작성자를 반환합니다
      getMacroAuthor() {
        return this.current.author || 'admin@izure.org'
      },

      // 매크로 도움말 URL 를 반환합니다
      getMacroURL() {
        return this.current.url || 'http://cafe.naver.com/lvejs'
      }

    },
    methods: {

      complete(e) {

      },

      cancel(e) {
        electron.remote.getCurrentWindow().close()
      }

    },

    created() {
      this.macro = electron.ipcRenderer.sendSync('macro-get-list')
      this.variables = electron.ipcRenderer.sendSync('macro-get')
    }
  }
</script>

<style lang="scss" scoped>
  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #555;
  }

  main {
    display: flex;
    flex: 1 1;
    flex-direction: column;

    >.macro-description-wrap {
      flex: 1 1;
    }

    >.macro-description-action {
      flex: 0 0;
      text-align: right;
    }
  }

  footer {
    min-height: 150px;
    flex: 0 0;
    background-color: #444;

    a {
      text-decoration: none;

      &:hover {
        color: gray;
      }
    }

    dl {
      font-size: small;
      margin: 20px;

      >dt {
        margin: 10px 0 5px;
      }

      >dd {
        margin: 0 10px;
      }
    }
  }
</style>

<style lang="scss">
  .macro-selector {

    input:hover,
    input:focus {
      background-color: initial;
    }
  }
</style>