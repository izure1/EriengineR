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
            @click="callContextmenuItem($event, item.click, tree.path, item.disabledOnTop, item.onlyOnTop)"
            :class="{disabled: isDisabledItem(item.disabledOnTop, item.onlyOnTop)}">
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
  import fs from 'fs-extra'
  import path from 'path'

  import electron, {
    ipcRenderer
  } from 'electron'
  import dirTree from './js/dirTree'
  import shortcut from './js/shortcut'
  import REGEXP from '@/assets/js/REGEXP'


  export default {
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
      contextmenu_info: {
        x: 0,
        y: 0,
        open: false
      },
      previewImage: ''
    }),
    computed: {
      isFolder() {
        return this.tree.children
      },
      isTop() {
        return this.top === this
      },
      nextDepth() {
        return this.depth + 1
      },
      isImageFile() {
        return REGEXP.image.test(this.tree.name)
      },
      isVideoFile() {
        return REGEXP.video.test(this.tree.name)
      },
      getPreviewSrc() {

        if (!this.isImageFile && !this.isVideoFile) {
          return
        }

        let asset

        asset = fs.readJSONSync(this.path)
        asset = asset.id

        return ipcRenderer.sendSync('asset-get-file', asset)

      }
    },
    methods: {

      copyJSON(json) {
        return JSON.parse(JSON.stringify(json))
      },

      runShortcut(e, p) {

        let k = e.keyCode

        if (k in shortcut) {
          shortcut[k].call(this, p)
        }

      },

      toggle() {
        if (this.isFolder && !this.modifyMode) {
          this.open = !this.open
        }
      },

      openThis(filepath) {
        if (!this.isFolder) {
          this.openItem(filepath)
        }
      },

      openContextmenu(e) {
        if (this.configurable) {
          this.contextmenu_info.open = true
          this.contextmenu_info.x = e.clientX
          this.contextmenu_info.y = e.clientY - 30
          e.currentTarget.focus()
        }
      },

      callContextmenuItem(e, fn, itempath, disabledOnTop = false, onlyOnTop = false) {

        e.preventDefault()
        e.stopPropagation()

        if (this.isTop && disabledOnTop) {
          return
        }

        if (!this.isTop && onlyOnTop) {
          return
        }

        fn.call(this.top.$parent, e, itempath, this)

        this.contextmenu_info.open = false

      },

      requestModifyName() {

        let t
        if (this.isTop) {
          return
        }

        this.modifyMode = true
        this.$nextTick(() => {
          t = this.$el.querySelector('input')
          t.value = this.tree.name
          t.focus()
          t.setSelectionRange(0, t.value.lastIndexOf('.'))
        })

      },

      modifyName(e, before) {

        let name
        let after

        name = e.currentTarget.value
        after = path.posix.join(path.dirname(before), name)

        if (!name) {
          this.modifyNameCancel(e)
          return
        }

        if (path.parse(before).ext !== path.parse(after).ext) {
          after = path.format({
            dir: path.dirname(after),
            name: path.parse(after).name,
            ext: path.extname(before)
          })
        }

        fs.rename(before, after, err => {

          this.modifyMode = false

          if (err) {
            throw err
          }

        })

      },

      modifyNameCancel(e) {
        e.currentTarget.value = this.tree.name
        this.modifyMode = false
      },

      setDragItem(e) {
        if (this.configurable) {
          e.dataTransfer.setData('filePath', this.tree.path)
        }
      },

      allowDrop(e) {
        if (this.configurable) {
          e.preventDefault()
        }
      },

      dropItem(e) {

        let before
        let after

        before = e.dataTransfer.getData('filePath')
        after = this.tree.path
        after = path.posix.join(after, path.basename(before))

        fs.rename(before, after)

      },

      requestDeleteItem(eternally) {

        if (this.isTop) {
          return
        }

        if (eternally) ipcRenderer.send('tree-delete', {
          name: path.basename(this.tree.path),
          path: this.tree.path
        })

        else ipcRenderer.send('modal-delete-trash', {
          name: path.basename(this.tree.path),
          path: this.tree.path
        })

      },

      isDisabledItem(disabledOnTop = false, onlyOnTop = false) {

        if (this.isTop && disabledOnTop) {
          return true
        }

        if (!this.isTop && onlyOnTop) {
          return true
        }

        return false

      },

      getFileIcon(itempath) {

        let ext

        ext = path.extname(itempath)
        ext = ext.toLowerCase()

        switch (ext) {

          case '.woff':
          case '.woff2':
            return 'fonticons'

          case '.png':
          case '.jpg':
          case '.jpeg':
          case '.gif':
            return 'image'

          case '.mp3':
            return 'audiotrack'

          case '.mp4':
            return 'movie'

          case '.esscript':
            return 'code'

          case '.esdesign_interface':
            return 'touch_app'

          case '.esdesign_actor':
            return 'accessibility'

          case '.esdesign_background':
            return 'camera'

          case '.json':
            return 'language'

          default:
            return 'attachment'

        }

      },

      watchDirectory() {

        if (this.top !== this) {
          return
        }

        this.tree = dirTree(this.path, this.filter)
        this.watcher = fs.watch(this.path, {
          recursive: true
        }, () => {
          this.tree = dirTree(this.path, this.filter)
        })

      },

      unwatchDirectory(p) {

        if (this.top !== this) {
          return
        }

        fs.unwatchFile(p, this.watcher)

      }

    },

    watch: {

      path(news, old) {

        if (this.top !== this) {
          return
        }

        this.unwatchDirectory(old)
        this.watchDirectory()

      },

      filter() {

        if (this.top !== this) {
          return
        }

        this.unwatchDirectory(this.path)
        this.watchDirectory()

      }

    },

    created() {
      this.watchDirectory()
    },

    mounted() {

      this.$el.querySelectorAll('div.template-treeview-indent').forEach(t => {
        t.style.marginLeft = `${t.dataset.depth * 10 + 10}px`
      })

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
        height: 25px;
        font-size: smaller;
        line-height: 25px;
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