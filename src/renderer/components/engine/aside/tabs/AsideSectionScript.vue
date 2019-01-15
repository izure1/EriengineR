<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :addContextmenu="contextmenu" :configurable="true"></treeview>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'fs-extra'

  import {
    ipcRenderer,
    shell
  } from 'electron'

  export default {
    components: {
      Treeview
    },
    data() {
      return {
        path: path.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Scripts'),
        filter: {
          extensions: /\.esscript/
        }
      }
    },
    computed: {

      contextmenu() {
        return [{
          text: '스크립트 편집',
          click(e, itempath) {
            this.openItem(itempath)
          }
        }]
      }

    },
    methods: {

      watchDirectoryChange() {

        let directory
        let stat

        fs.watch(this.path, {
          recursive: true
        }, (e, filepath) => {

          directory = path.join(this.path, filepath)
          stat = fs.lstatSync(directory)

          if (!stat.isDirectory()) {
            return
          }

          this.$root.$emit('setDataForWorkspaceTab', stat.ino, {
            directory
          })

        })

      },

      openItem(itempath) {
        this.openViewer(itempath, itempath)
      },

      openViewer(dirpath, script) {

        let stat
        let directory
        let dirname

        stat = fs.lstatSync(dirpath)

        // 폴더일 경우 자기 자신에서 열기
        if (stat.isDirectory()) {
          directory = dirpath
        }
        // 파일일 경우, 해당 폴더에서 열기
        else {
          directory = path.dirname(dirpath)
          stat = fs.lstatSync(directory)
        }

        dirname = path.basename(directory)

        // 파일의 좌표를 받아오기
        try {
          script = fs.readJSONSync(script)
        } catch (e) {}

        this.$root.$emit('createWorkspaceTab', stat.ino, `${dirname} 스크립트 뷰어`, 'SCRIPT-VIEWER')
        this.$root.$emit('setDataForWorkspaceTab', stat.ino, {
          directory,
          script
        })

      }

    },
    mounted() {

      this.watchDirectoryChange()

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>