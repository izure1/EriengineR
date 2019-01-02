<template>
  <section>
    <header>
      <div>
        <select @change="onMacroSelected">
          <option disabled selected>사용할 매크로를 선택하세요</option>
          <optgroup v-for="(macros, key) in getSortedMacroGroup" :key="key" :label="key">
            <option v-for="macro in macros" :key="macro.cid" :value="macro.cid">{{ macro.title }}</option>
          </optgroup>
        </select>
      </div>
    </header>
    <main>
      <div class="macro-description-wrap">
        <macro-description v-if="isMacroReady" :selected="selected" :current="current" :macros="getSelectedMacroGroup"></macro-description>
      </div>
      <div class="macro-description-done">
        <button @click="complete" :disabled="!selected">완료</button>
        <button @click="cancel">취소</button>
      </div>
    </main>
    <footer>
      <div>
        <dl v-if="selected">
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

  import getSortedMacroGroup from './js/getSortedMacroGroup'

  let require

  let macroDirectory
  let macro
  let map


  require = global.require

  macroDirectory = path.join(__static, 'assets', 'macro')
  map = new Map
  macro = {}


  // macro 폴더 내에 있는 모든 매크로를 불러옵니다
  for (let dirname of fs.readdirSync(macroDirectory)) {

    let dir

    dir = path.join(macroDirectory, dirname, '**/*.js')
    dir = glob.sync(dir)
    dir = dir.map(f => {

      f = require(f)
      map.set(f.cid, f)

      return f

    })

    macro[dirname] = dir

  }


  export default {
    components: {
      MacroDescription
    },
    data() {
      return {
        macro,
        map,
        selected: null,
        current: null
      }
    },
    computed: {

      // events, conditions, actions 중 한 부류의 매크로들을 배열에 담아 반환합니다
      getSelectedMacroGroup() {

        let group

        group = this.$route.params.group
        group = this.macro[group]

        return group

      },

      // 매크로내의 class 에 따라 그룹화하여 Object 형태로 반환합니다
      getSortedMacroGroup() {
        return getSortedMacroGroup(this.getSelectedMacroGroup)
      },

      // 매크로 작성자를 반환합니다
      getMacroAuthor() {
        return this.selected.author || 'admin@izure.org'
      },

      // 매크로 도움말 URL 를 반환합니다
      getMacroURL() {
        return this.selected.url || 'http://cafe.naver.com/lvejs'
      },

      isMacroReady() {
        return this.current && this.selected
      }

    },
    methods: {

      onMacroSelected(e) {
        this.selected = this.map.get(e.currentTarget.value)
      },

      complete(e) {

      },

      cancel(e) {
        electron.remote.getCurrentWindow().close()
      }

    },
    created() {

      electron.ipcRenderer.send('macro-get')
      electron.ipcRenderer.once('macro-get', (e, macro) => {
        this.current = macro
        console.log(this)
      })

    }
  }
</script>

<style lang="scss" scoped>
  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #d9d9d9;
  }

  header {
    height: 60px;
    flex: 0 0;

    >div {
      height: 100%;
      padding: 10px;
      box-sizing: border-box;

      >select {
        width: 100%;
        height: 100%;
        font-size: medium;
        padding: 0 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 5px;
        background-color: #efefef;

        >optgroup {
          font-size: medium;
          color: #0075c8;
        }

        option {
          font-size: medium;
        }
      }
    }
  }

  main {
    display: flex;
    flex: 1 1;
    flex-direction: column;

    >div {
      padding: 10px;
    }

    >.macro-description-wrap {
      flex: 1 1;
    }

    >.macro-description-done {
      flex: 0 0;
      text-align: right;

      >button {
        width: 120px;
        height: 40px;
        border: 0;
        background-color: #efefef;
        padding: 0;
        cursor: pointer;

        &:not([disabled]):hover {
          background-color: white;
        }
      }
    }
  }

  footer {
    min-height: 150px;
    flex: 0 0;
    background-color: #efefef;

    a {
      color: inherit;
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