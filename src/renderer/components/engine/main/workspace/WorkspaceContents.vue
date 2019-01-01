<template>
  <section class="workspace-contents">
    <ul v-if="!isEmpty">
      <li v-for="(item, index) in tabs" :key="index" :data-id="item.id" v-show="item.show">
        <section>
          <template-default v-if="item.template === 'DEFAULT'" :data="item.data"></template-default>
          <template-canvas v-else-if="item.template === 'CANVAS'" :data="item.data"></template-canvas>
          <template-script-viewer v-else-if="item.template === 'SCRIPT-VIEWER'" :data="item.data"></template-script-viewer>
          <template-script-editor v-else-if="item.template === 'SCRIPT-EDITOR'" :data="item.data"></template-script-editor>
        </section>
      </li>
    </ul>
    <div v-if="isEmpty" class="workspace-contents-empty">
      <div class="workspace-contents-emptylogo">
        <img src="~@/assets/img/logo_eri_notab.png">
      </div>
      <dl>
        <dt>새로운 프로젝트</dt>
        <dd>Ctrl + N</dd>
        <dt>프로젝트 불러오기</dt>
        <dd>Ctrl + O</dd>
        <dt>엔진 정보</dt>
        <dd>Ctrl + I</dd>
      </dl>
    </div>
  </section>
</template>

<script>
  import WorkspaceContent from './js/WorkspaceContent'

  // template 목록
  import TemplateDefault from './Templates/Default'
  import TemplateCanvas from './Templates/Canvas'
  import TemplateScriptViewer from './Templates/ScriptViewer'
  import TemplateScriptEditor from './Templates/ScriptEditor'

  export default {
    components: {
      TemplateDefault,
      TemplateCanvas,
      TemplateScriptViewer,
      TemplateScriptEditor
    },
    data() {
      return {
        tabs: []
      }
    },
    computed: {
      isEmpty() {
        return !this.tabs.length
      }
    },
    methods: {

      createContent(id, template) {

        this.tabs.push(new WorkspaceContent(id, template))

      },

      showContent(id) {

        let tab

        tab = this.tabs.filter(t => {
          t.show = false
          return t.id === id
        })

        if (tab = tab[0]) {
          tab.show = true
        }

      },

      closeContent(id) {

        let i
        let tab

        i = this.tabs.length

        while (i--) {

          tab = this.tabs[i]

          if (tab.id !== id) continue

          this.tabs.splice(i, 1)
          break

        }

      },

      setData(id, data) {

        for (let tab of this.tabs) {

          if (tab.id !== id) {
            continue
          }

          tab.data = data

        }

      }

    },

    created() {

      this.$root.$on('createWorkspaceTab-content', (id, template) => {
        this.createContent(id, template)
      });

      this.$root.$on('showWorkspaceTab-content', id => {
        this.showContent(id)
      })

      this.$root.$on('closeWorkspaceTab-content', id => {
        this.closeContent(id)
      })

      this.$root.$on('setDataForWorkspaceTab', (id, data) => {
        this.setData(id, data)
      })

    }
  }
</script>

<style lang="scss" scoped>
  ul,
  li {
    padding: 0;
    margin: 0;
  }

  .workspace-contents {
    width: 100%;
    height: calc(100% - 33px);
    display: table;

    >ul {
      width: 100%;
      height: 100%;

      >li {
        width: 100%;
        height: 100%;

        >section {
          height: 100%;
          overflow: scroll;
        }
      }
    }
  }

  .workspace-contents-empty {
    height: calc(100% - 33px);
    display: table-cell;
    vertical-align: middle;

    >dl {
      $marginBetween: 10px 0 0;

      text-shadow: 0 0 1px white;
      color: gray;
      top: 50%;

      >dt,
      >dd {
        width: 50%;
        float: left;
        margin: 0;
      }

      >dt {
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }

      >dd {
        padding-left: 10px;
        box-sizing: border-box;
      }

      >dt:not(:nth-of-type(1)) {
        margin: $marginBetween;
        clear: both;
      }

      >dd:not(:nth-of-type(1)) {
        margin: $marginBetween;
      }
    }
  }

  .workspace-contents-emptylogo {
    text-align: center;
  }
</style>