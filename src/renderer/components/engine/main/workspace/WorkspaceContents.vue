<template>
  <section class="workspace-contents">
    <div v-if="!isEmpty" class="workspace-contents-wrap">
      <div v-for="(item, index) in tabs" :key="index" :data-id="item.id" v-show="item.show"
        class="workspace-contents-tab">
        <section class="workspace-contents-page">
          <template-default v-if="item.template === 'DEFAULT'" :data="item.data"></template-default>
          <template-canvas v-else-if="item.template === 'CANVAS'" :data="item.data"></template-canvas>
          <template-script-viewer-action v-else-if="item.template === 'SCRIPT-VIEWER-ACTION'" :data="item.data">
          </template-script-viewer-action>
          <template-script-viewer v-else-if="item.template === 'SCRIPT-VIEWER'" :data="item.data">
          </template-script-viewer>
          <template-script-editor v-else-if="item.template === 'SCRIPT-EDITOR'" :data="item.data">
          </template-script-editor>
          <template-language-manager v-else-if="item.template === 'LANGUAGE-MANAGER'" :data="item.data">
          </template-language-manager>
          <template-design-creator v-else-if="item.template === 'DESIGN-CREATOR'" :data="item.data">
          </template-design-creator>
          <template-design-editor v-else-if="item.template === 'DESIGN-EDITOR'" :data="item.data">
          </template-design-editor>
        </section>
      </div>
    </div>
    <div v-if="isEmpty" class="workspace-contents-empty">
      <div>
        <div class="workspace-contents-emptylogo">
          <img src="~@/assets/img/ico_eri_256.png">
        </div>
        <dl>
          <dt>새로운 프로젝트</dt>
          <dd><kbd>Ctrl + N</kbd></dd>
          <dt>프로젝트 불러오기</dt>
          <dd><kbd>Ctrl + O</kbd></dd>
          <dt>엔진 정보</dt>
          <dd><kbd>Ctrl + I</kbd></dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
  import WorkspaceContent from './js/WorkspaceContent'

  // template 목록
  import TemplateDefault from './Templates/Default'
  import TemplateCanvas from './Templates/Canvas'
  import TemplateScriptViewerAction from './Templates/ScriptViewerAction'
  import TemplateScriptViewer from './Templates/ScriptViewer'
  import TemplateScriptEditor from './Templates/ScriptEditor'
  import TemplateLanguageManager from './Templates/LanguageManager'
  import TemplateDesignCreator from './Templates/DesignCreator'
  import TemplateDesignEditor from './Templates/DesignEditor'

  export default {
    components: {
      TemplateDefault,
      TemplateCanvas,
      TemplateScriptViewerAction,
      TemplateScriptViewer,
      TemplateScriptEditor,
      TemplateLanguageManager,
      TemplateDesignCreator,
      TemplateDesignEditor
    },
    data: () => ({
      tabs: []
    }),
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

      closeContent(id, onclose) {

        let i
        let tab

        i = this.tabs.length

        while (i--) {

          tab = this.tabs[i]

          if (tab.id !== id) continue

          this.tabs.splice(i, 1)

          if (onclose && onclose.call) {
            onclose.call(tab)
          }

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

      this.$root.$on('closeWorkspaceTab-content', (id, onclose) => {
        this.closeContent(id, onclose)
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
    height: calc(100% - 33px);
  }

  .workspace-contents-wrap,
  .workspace-contents-tab {
    height: 100%;
  }

  .workspace-contents-page {
    height: 100%;
    overflow: auto;

    >* {
      position: relative;
    }
  }

  .workspace-contents-empty {
    width: 100%;
    height: 100%;
    display: table;

    >div {
      display: table-cell;
      vertical-align: middle;

      >dl {
        $marginBetween: 10px 0 0;
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
  }

  .workspace-contents-emptylogo {
    text-align: center;

    >img {
      width: 180px;
      margin: 30px;
      filter: grayscale(1)
    }
  }
</style>