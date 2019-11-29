<template>
  <div class="template-treeview-item">
    <div @mousedown="selectThis(tree.path)" @click="toggle(tree.path)" @dblclick="openThis(tree.path)" tabindex="-1"
      @contextmenu="openContextmenu" @blur="contextmenu_info.open = false" @keydown="runShortcut($event, tree.path)"
      class="template-treeview-itemwrap">
      <div class="template-treeview-indent" :data-depth="depth">
        <v-icon v-if="isFolder" color="yellow" small left>{{ open ? 'arrow_drop_down' : 'arrow_right' }}</v-icon>
        <v-icon v-else color="rgb(140, 140, 140)" small left>{{ getFileIcon(tree.path) }}</v-icon>
        <v-tooltip v-if="!modifyMode" bottom :disabled="isFolder">
          <template v-slot:activator="{ on }">
            <p v-on="on">{{ tree.name }}</p>
          </template>
          <div class="treeview-tooltip-section">
            <div class="treeview-tooltip-name text-xs-center">{{ tree.name }}</div>
            <div v-if="!!getPreviewSrc">
              <v-divider class="mt-1 mb-2"></v-divider>
              <div v-if="isImageFile">
                <v-img :src="getPreviewSrc"></v-img>
              </div>
              <div v-else-if="isVideoFile">
                <video :src="getPreviewSrc" width="100%"></video>
              </div>
            </div>
          </div>
        </v-tooltip>
        <input v-else type="text" @keydown.esc="modifyNameCancel" @keydown.enter="modifyName($event, tree.path)"
          @blur="modifyName($event, tree.path)">
      </div>
      <div v-if="contextmenu_info.open" class="template-treeview-contextmenu"
        :style="{left: `${contextmenu_info.x}px`, top: `${contextmenu_info.y}px`}">
        <div class="template-treeview-contextitem">
          <div v-for="(ctx, index) in contextmenu" :key="index"
            @click="callContextmenuItem($event, ctx.handler, tree.path, ctx.disabledOnTop, ctx.onlyOnTop)"
            :class="{disabled: isDisabledItem(ctx.disabledOnTop, ctx.onlyOnTop)}" v-show="isContextVisible(ctx)" v-once>
            <hr v-if="ctx.separator">
            <span v-else>{{ ctx.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="open" v-if="isFolder" class="template-treeview-next">
      <treeview v-for="branch in tree.children" :path="branch.path" :filter="filter" :tree="branch" :key="branch.path"
        :openItem="openItem" :selectItem="selectItem" :configurable="configurable" :contextmenu="contextmenu" :top="top"
        :depth="nextDepth">
      </treeview>
    </div>
  </div>
</template>

<script>
  import {
    shell
  } from 'electron'

  import Draggable from '@/assets/js/Draggable'

  // Computed
  import getPreviewSrc from './computed/getPreviewSrc'
  import isFolder from './computed/isFolder'
  import isImageFile from './computed/isImageFile'
  import isTop from './computed/isTop'
  import isVideoFile from './computed/isVideoFile'
  import nextDepth from './computed/nextDepth'

  // Methods
  import setDragEvent from './methods/setDragEvent'
  import callContextmenuItem from './methods/callContextmenuItem'
  import copyJSON from './methods/copyJSON'
  import dropItem from './methods/dropItem'
  import getFileIcon from './methods/getFileIcon'
  import isContextVisible from './methods/isContextVisible'
  import isDisabledItem from './methods/isDisabledItem'
  import modifyName from './methods/modifyName'
  import modifyNameCancel from './methods/modifyNameCancel'
  import openContextmenu from './methods/openContextmenu'
  import selectThis from './methods/selectThis'
  import openThis from './methods/openThis'
  import requestDeleteItem from './methods/requestDeleteItem'
  import requestModifyName from './methods/requestModifyName'
  import runShortcut from './methods/runShortcut'
  import setDragItem from './methods/setDragItem'
  import toggle from './methods/toggle'
  import watchDirectory from './methods/watchDirectory'
  import unwatchDirectory from './methods/unwatchDirectory'

  // Watch
  import watchFilter from './watch/filter'
  import watchPath from './watch/path'


  import {
    Contextmenu,
    ContextmenuItem
  } from './js/Contextmenu'

  export default {

    // Export Contextmenu class
    Contextmenu,
    ContextmenuItem,

    // Vue data tree
    name: 'treeview',
    props: {
      watcher: null,
      path: String,
      filter: {
        type: Object,
        default: {}
      },
      tree: {
        type: Object,
        default: {}
      },
      configurable: {
        type: Boolean,
        default: false
      },
      contextmenu: {
        type: Array,
        default () {
          return []
        }
      },
      depth: {
        type: Number,
        default: 0
      },
      top: {
        type: Object,
        default () {
          return this
        }
      },
      openItem: {
        type: Function,
        default () {
          shell.openItem(this.tree.path)
        }
      },
      selectItem: {
        type: Function,
        default () {
          return false
        }
      }
    },
    data: () => ({
      draggable: new Draggable,
      open: false,
      modifyMode: false,
      separatorVisiblity: false,
      contextmenu_info: {
        x: 0,
        y: 0,
        open: false
      },
      previewImage: ''
    }),
    computed: {
      isFolder,
      isTop,
      nextDepth,
      isImageFile,
      isVideoFile,
      getPreviewSrc,
    },
    methods: {
      setDragEvent,
      copyJSON,
      isContextVisible,
      runShortcut,
      toggle,
      selectThis,
      openThis,
      openContextmenu,
      callContextmenuItem,
      requestModifyName,
      modifyName,
      modifyNameCancel,
      setDragItem,
      dropItem,
      requestDeleteItem,
      isDisabledItem,
      getFileIcon,
      watchDirectory,
      unwatchDirectory,
    },

    watch: {
      watchPath,
      watchFilter,
    },

    created() {
      this.watchDirectory()
    },

    mounted() {

      this.$el.querySelectorAll('div.template-treeview-indent').forEach(t => {
        t.style.marginLeft = `${t.dataset.depth * 10 + 10}px`
      })

      this.setDragEvent()

    },

    beforeDestroy() {
      this.unwatchDirectory()
    }

  }
</script>

<style lang="scss" scoped>
  .v-icon {
    font-size: smaller;
  }

  .template-treeview-item {
    margin: 4px 0;
    position: relative;
    cursor: pointer;
  }

  .template-treeview-itemwrap:hover {
    background-color: rgba(255, 255, 255, .1);
  }

  .template-treeview-next {
    outline: none;
  }

  .template-treeview-contextmenu {
    width: 300px;
    background-color: #444;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .3);
    position: fixed;
    z-index: 1;
  }

  .template-treeview-contextitem {
    padding: 5px 0;

    >div {
      &.disabled {
        color: #555;
      }

      &:not(.disabled):hover {
        background-color: rgba(255, 255, 255, .1);
      }

      >span {
        height: 28px;
        font-size: smaller;
        line-height: 28px;
        padding: 0 25px;
        display: block;
      }

      >hr {
        height: 1px;
        margin: 7px;
        border: 0;
        background-color: #555;
      }
    }
  }

  .template-treeview-indent {
    padding: 3px 0;
    position: relative;

    p,
    input {
      width: calc(100% - 40px);
      height: 18px;
      font-size: small;
      line-height: 20px;
      padding: 0;
      margin: 0;
      border: none;
      outline: none;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      box-sizing: border-box;
    }

    input {
      padding-top: 3px;
    }
  }

  .treeview-tooltip-section {
    min-width: 200px;
    max-width: 200px;
  }

  .treeview-tooltip-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>