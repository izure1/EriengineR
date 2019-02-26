<template>
  <section>
    <header>
      <div>
        <v-autocomplete :items="getMacroList" :hint="macro ? `${macro.class}` : ''" v-model="macro" append-icon="search"
          dense box height="70" background-color="#444" color="orange" item-text="text" item-value="value"
          label="매크로를 선택하세요" class="macro-selector" no-data-text="해당하는 매크로가 없습니다" @change="sendMacroCopy"></v-autocomplete>
      </div>
    </header>
    <main>
      <div class="macro-description-wrap">
        <macro-description v-if="macro" :macro="macro" :current="current" :macros="getMacroGroup"></macro-description>
      </div>
      <div class="macro-description-action">
        <v-btn @click="complete" :disabled="!isSavable" large>
          <v-icon>save</v-icon>
          저장
        </v-btn>
        <v-btn @click="cancel" large>
          <v-icon>delete</v-icon>
          취소
        </v-btn>
      </div>
    </main>
    <footer>
      <div>
        <dl v-if="macro">
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
  import {
    Macro
  } from '@static/js/class/Script'

  export default {
    components: {
      MacroDescription
    },
    data: () => ({
      win: electron.remote.getCurrentWindow(),
      modifiedMacro: null,
      macros: null,
      macro: null,
      current: null
    }),
    computed: {

      // events, conditions, actions 중 한 부류의 매크로들을 배열에 담아 반환합니다
      getMacroGroup() {

        let group

        if (!this.macros) {
          return []
        }

        group = this.$route.params.group
        group = this.macros[group]

        return group

      },

      getMacroList() {
        return getMacroList(this.getMacroGroup)
      },

      isSavable() {
        return this.macro && this.modifiedMacro
      },

      // 매크로 작성자를 반환합니다
      getMacroAuthor() {
        return this.macro.author || 'admin@izure.org'
      },

      // 매크로 도움말 URL 를 반환합니다
      getMacroURL() {
        return this.macro.url || 'http://cafe.naver.com/lvejs'
      }

    },
    methods: {

      sendMacroCopy(macro) {
        this.current = new Macro().buildFromMacro(macro)
      },

      complete(e) {
        this.win.emit('macro-saved', this.modifiedMacro)
        this.win.close()
      },

      cancel(e) {
        this.win.close()
      }

    },

    created() {

      // static/assets/macro 디렉토리로부터 모든 매크로 정보를 받아옵니다
      // FIXME: 사용자의 에리엔진 디렉토리에 복사된 매크로 폴더로부터 정보를 받아와야 합니다. 그래야 사용자가 직접 작성한 매크로 정보까지 불러옴
      this.macros = electron.ipcRenderer.sendSync('macro-get-list')

      // MacroDescriptionContext 에서 checkSavable 메서드가 발생되었을 때, 결과값을 수신받습니다.
      // 매크로의 모든 변수가 입력되어 저장이 가능한 상태라면, 매개변수로 매크로 데이터를, 그렇지 않을 경우 null 을 수신받습니다.
      this.win.on('macro-savable', macro => {
        this.modifiedMacro = macro
      })

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