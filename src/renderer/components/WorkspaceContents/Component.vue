<template>
  <section class="workspace-contents">
    <div v-if="!isEmpty" class="workspace-contents-wrap">
      <div v-for="[key, item] in tabs.entries()" :key="key" :data-id="key" v-show="item.show"
        class="workspace-contents-tab">
        <section class="workspace-contents-page">
          <template-default v-if="item.template === 'DEFAULT'" :data="item.data"></template-default>
          <template-script-viewer-action v-else-if="item.template === 'SCRIPT-VIEWER-ACTION'" :data="item.data">
          </template-script-viewer-action>
          <template-script-viewer v-else-if="item.template === 'SCRIPT-VIEWER'" :data="item.data">
          </template-script-viewer>
          <template-script-editor v-else-if="item.template === 'SCRIPT-EDITOR'" :data="item.data">
          </template-script-editor>
          <template-locale-manager v-else-if="item.template === 'LOCALE-MANAGER'" :data="item.data">
          </template-locale-manager>
          <template-design-creator v-else-if="item.template === 'DESIGN-CREATOR'" :data="item.data">
          </template-design-creator>
          <template-design-editor v-else-if="item.template === 'DESIGN-EDITOR'" :data="item.data">
          </template-design-editor>
          <template-actor-viewer v-else-if="item.template === 'ACTOR-VIEWER'" :data="item.data"></template-actor-viewer>
          <template-actor-editor v-else-if="item.template === 'ACTOR-EDITOR'" :data="item.data"></template-actor-editor>
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
  import {
    VueMap
  } from '@common/js/VueIterator'

  // template 목록
  import TemplateDefault from '@/components/Template-Default/Component'
  import TemplateScriptViewerAction from '@/components/Template-ScriptViewerAction/Component'
  import TemplateScriptViewer from '@/components/Template-ScriptViewer/Component'
  import TemplateScriptEditor from '@/components/Template-ScriptEditor/Component'
  import TemplateLocaleManager from '@/components/Template-LocaleManager/Component'
  import TemplateDesignCreator from '@/components/Template-DesignCreator/Component'
  import TemplateDesignEditor from '@/components/Template-DesignEditor/Component'
  import TemplateActorViewer from '@/components/Template-ActorViewer/Component'
  import TemplateActorEditor from '@/components/Template-ActorEditor/Component'

  export default {
    components: {
      TemplateDefault,
      TemplateScriptViewerAction,
      TemplateScriptViewer,
      TemplateScriptEditor,
      TemplateLocaleManager,
      TemplateDesignCreator,
      TemplateDesignEditor,
      TemplateActorViewer,
      TemplateActorEditor,
    },
    data: () => ({
      tabs: new VueMap
    }),
    computed: {

      isEmpty() {
        return !this.tabs.size
      }

    },
    methods: {

      createContent(id, template) {
        this.tabs.set(id, new WorkspaceContent(template))
      },

      showContent(id) {

        this.tabs.forEach(t => {
          t.show = false
        })

        if (!this.tabs.has(id)) {
          return
        }

        this.tabs.get(id).show = true

      },

      closeContent(id, onclose) {

        if (!this.tabs.has(id)) {
          return
        }

        let tab = this.tabs.get(id)
        this.tabs.delete(id)

        if (onclose && onclose.call) {
          onclose.call(tab)
        }

      },

      setData(id, data) {

        if (!this.tabs.has(id)) {
          return
        }

        this.tabs.get(id).data = data

      }

    },

    created() {

      this.$root.$on('create-workspace-content', (id, template) => {
        this.createContent(id, template)
      })

      this.$root.$on('show-workspace-content', id => {
        this.showContent(id)
      })

      this.$root.$on('close-workspace-content', (id, onclose) => {
        this.closeContent(id, onclose)
      })

      this.$root.$on('set-data-workspace', (id, data) => {
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