<template>
  <section>
    <header>
      <div>
        <select @change="onMacroSelected">
          <optgroup v-for="(macros, key) in getSortedMacroGroup" :key="key" :label="key">
            <option v-for="macro in macros" :key="macro.cid" :value="macro.cid">{{ macro.title }}</option>
          </optgroup>
        </select>
      </div>
    </header>
    <main>
      <div>
        <macro-description :current="current" :macros="getCurrentMacroGroup" :path="path"></macro-description>
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
        current: null,
        path: atob(this.$route.params.path)
      }
    },
    computed: {

      // events, conditions, actions 중 한 부류의 매크로들을 배열에 담아 반환합니다
      getCurrentMacroGroup() {

        let group

        group = this.$route.params.group
        group = this.macro[group]

        return group

      },

      // 매크로내의 class 에 따라 그룹화하여 Object 형태로 반환합니다
      getSortedMacroGroup() {
        return getSortedMacroGroup(this.getCurrentMacroGroup)
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
      onMacroSelected(e) {
        this.current = this.map.get(e.currentTarget.value)
      }
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
    flex: 1 1;

    >div {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
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