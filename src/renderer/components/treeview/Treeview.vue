<template>
  <li class="template-treeview-item">
    <div :title="model.path" @click="toggle" @dblclick="openThis(model.path)" tabindex="-1" @contextmenu="openContextmenu"
      @blur="contextmenu_info.open = false" draggable="true" @dragstart="setDragItem" @dragover="allowDrop" @drop="dropItem">
      <div class="template-treeview-indent" :data-depth="depth">
        <sui-icon :name="open ? 'folder outline open' : 'folder outline'" v-if="isFolder"></sui-icon>
        <sui-icon :name="getFileIcon(model.path)" v-else></sui-icon>
        <p v-if="!modifyMode">{{ model.name }}</p>
        <input type="text" v-else @keydown.esc="modifyNameCancel" @keydown.enter="modifyName($event, model.path)" @blur="modifyName($event, model.path)">
      </div>
      <div v-if="contextmenu_info.open" class="template-treeview-contextmenu" :style="{left: `${contextmenu_info.x}px`, top: `${contextmenu_info.y}px`}">
        <ul>
          <li v-for="(item, index) in contextmenu" :key="index" @click="callContextmenuItem($event, item.click, model.path, item.disabledOnTop)"
            :class="{disabled: isDisabledItem(item.disabledOnTop)}">
            <hr v-if="item.separator">
            <span v-else>{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
    <ul v-show="open" v-if="isFolder">
      <treeview class="item" v-for="model in model.children" :path="path" :filter="filter" :model="model" :key="model.path"
        :openItem="openItem" :configurable="configurable" :contextmenu="contextmenu" :top="top" :depth="nextDepth"></treeview>
    </ul>
  </li>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import electron, {
    ipcRenderer
  } from 'electron'
  import dirTree from 'directory-tree'


  export default {
    name: 'treeview',
    props: {
      path: String,
      filter: {
        type: Object,
        default: {}
      },
      model: {
        type: Object,
        default () {

          fs.watch(this.path, {
            recursive: true
          }, () => {
            this.model = dirTree(this.path, this.filter)
          })

          return dirTree(this.path, this.filter)

        }
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
          electron.shell.openItem(this.model.path)
        }
      }
    },
    data() {
      return {
        open: false,
        modifyMode: false,
        contextmenu_info: {
          x: 0,
          y: 0,
          open: false
        }
      }
    },
    computed: {
      isFolder() {
        return this.model.children
      },
      isTop() {
        return this.top === this
      },
      nextDepth() {
        return this.depth + 1
      }
    },
    methods: {
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
          this.contextmenu_info.y = e.clientY
          e.currentTarget.focus()
        }
      },
      callContextmenuItem(e, fn, itempath, disabled = false) {

        e.preventDefault()
        e.stopPropagation()

        if (disabled && this.isTop) {
          return
        }

        fn.call(this.top.$parent, e, itempath, this)

        this.contextmenu_info.open = false

      },
      modifyName(e, before) {

        let name
        let after

        name = e.currentTarget.value
        after = path.join(path.dirname(before), name)

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
        e.currentTarget.value = this.model.name
        this.modifyMode = false
      },
      setDragItem(e) {
        if (this.configurable) {
          e.dataTransfer.setData('filePath', this.model.path)
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
        after = this.model.path
        after = path.join(after, path.basename(before))

        fs.rename(before, after)

      },
      isDisabledItem(disabled = false) {

        if (this.isTop) {
          if (disabled) return true
          else return false
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
            return 'fonticons';

          case '.png':
          case '.jpg':
          case '.jpeg':
          case '.gif':
            return 'file image';

          case '.mp3':
            return 'file audio';

          case '.mp4':
            return 'file video';

          case '.esscript':
            return 'code'

          case '.esinterface':
            return 'eye'

          default:
            return 'file';

        }

      }
    },
    mounted() {
      this.$el.querySelectorAll('div.template-treeview-indent').forEach(t => {
        t.style.marginLeft = `${t.dataset.depth * 10 + 15}px`
      })
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .template-treeview-item {
    margin: 4px 0;
    position: relative;
    cursor: pointer;

    >div {
      outline: none;

      &:hover {
        background-color: rgba(255, 255, 255, .1);
      }
    }

  }

  .template-treeview-contextmenu {
    width: 300px;
    background-color: #444;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .3);
    position: fixed;
    z-index: 1;

    >ul {
      padding: 5px 0;

      >li {
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
  }

  .template-treeview-indent {
    padding: 3px 0;
    position: relative;

    >p,
    >input {
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
</style>