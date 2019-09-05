<template>
  <div class="template-treeview-item">
    <div @click="toggle" @dblclick="openThis(tree.path)" tabindex="-1" @contextmenu="openContextmenu"
      @blur="contextmenu_info.open = false" draggable="true" @dragstart="setDragItem" @dragover="allowDrop"
      @drop="dropItem" @keydown="runShortcut($event, tree.path)" class="template-treeview-itemwrap">
      <div class="template-treeview-indent" :data-depth="depth">
        <v-icon v-if="isFolder" color="yellow" small>{{ open ? 'arrow_drop_down' : 'arrow_right' }}</v-icon>
        <v-icon v-else color="rgb(140, 140, 140)" small>{{ getFileIcon(tree.path) }}</v-icon>
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
        <input type="text" v-else @keydown.esc="modifyNameCancel" @keydown.enter="modifyName($event, tree.path)"
          @blur="modifyName($event, tree.path)">
      </div>
      <div v-if="contextmenu_info.open" class="template-treeview-contextmenu"
        :style="{left: `${contextmenu_info.x}px`, top: `${contextmenu_info.y}px`}">
        <div class="template-treeview-contextitem">
          <div v-for="(item, index) in contextmenu" :key="index"
            @click="callContextmenuItem($event, item.handler, tree.path, item.disabledOnTop, item.onlyOnTop)"
            :class="{disabled: isDisabledItem(item.disabledOnTop, item.onlyOnTop)}"
            v-show="isContextItemShow(item, index)">
            <hr v-if="item.separator">
            <span v-else>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="open" v-if="isFolder" class="template-treeview-next">
      <treeview v-for="branch in tree.children" :path="branch.path" :filter="filter" :tree="branch" :key="branch.path"
        :openItem="openItem" :configurable="configurable" :contextmenu="contextmenu" :top="top" :depth="nextDepth">
      </treeview>
    </div>
  </div>
</template>

<script>
  import electron from 'electron'

  // Computed
  import getPreviewSrc from './js/computed/getPreviewSrc'
  import isFolder from './js/computed/isFolder'
  import isImageFile from './js/computed/isImageFile'
  import isTop from './js/computed/isTop'
  import isVideoFile from './js/computed/isVideoFile'
  import nextDepth from './js/computed/nextDepth'

  // Methods
  import allowDrop from './js/methods/allowDrop'
  import callContextmenuItem from './js/methods/callContextmenuItem'
  import copyJSON from './js/methods/copyJSON'
  import dropItem from './js/methods/dropItem'
  import getFileIcon from './js/methods/getFileIcon'
  import isContextItemShow from './js/methods/isContextItemShow'
  import isDisabledItem from './js/methods/isDisabledItem'
  import modifyName from './js/methods/modifyName'
  import modifyNameCancel from './js/methods/modifyNameCancel'
  import openContextmenu from './js/methods/openContextmenu'
  import openThis from './js/methods/openThis'
  import requestDeleteItem from './js/methods/requestDeleteItem'
  import requestModifyName from './js/methods/requestModifyName'
  import runShortcut from './js/methods/runShortcut'
  import setDragItem from './js/methods/setDragItem'
  import toggle from './js/methods/toggle'
  import watchDirectory from './js/methods/watchDirectory'
  import unwatchDirectory from './js/methods/unwatchDirectory'

  // Watch
  import watchFilter from './js/watch/filter'
  import watchPath from './js/watch/path'


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
          electron.shell.openItem(this.tree.path)
        }
      }
    },
    data: () => ({
      open: false,
      modifyMode: false,
      separatorVisible: false,
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
      copyJSON,
      isContextItemShow,
      runShortcut,
      toggle,
      openThis,
      openContextmenu,
      callContextmenuItem,
      requestModifyName,
      modifyName,
      modifyNameCancel,
      setDragItem,
      allowDrop,
      dropItem,
      requestDeleteItem,
      isDisabledItem,
      getFileIcon,
      watchDirectory,
      unwatchDirectory
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

    },

    destroyed() {
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
      margin: 0;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    >input {
      padding: 0;
      border: 0;
      border-bottom: 1px solid #0075c8;
      outline: none;
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