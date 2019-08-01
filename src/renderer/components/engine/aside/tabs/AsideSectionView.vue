<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :contextmenu="contextmenu" :configurable="true">
    </treeview>
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

  import CONTEXTMENU from '../vars/CONTEXTMENU'


  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: path.posix.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Views'),
      filter: {
        extensions: /\.esview/
      }
    }),
    computed: {

      contextmenu() {
        return [{
            text: '뷰 편집',
            disabledOnTop: true,
            click(e, itempath) {
              this.openViewer(itempath)
            }
          },
          {
            separator: true
          },
          ...new CONTEXTMENU
        ]
      }

    },
    methods: {

      openItem(itempath) {
        this.openViewer(itempath)
      },

      openViewer(itempath) {

        let stat
        let directory
        let dirname

        stat = fs.lstatSync(itempath)

        // 폴더일 경우 자기 자신에서 열기
        if (stat.isDirectory()) {
          directory = itempath
        }
        // 파일일 경우, 해당 폴더에서 열기
        else {
          directory = path.dirname(itempath)
          stat = fs.lstatSync(directory)
        }

        dirname = path.basename(directory)

        this.$root.$emit('createWorkspaceTab', stat.ino, `${dirname} 뷰 에디터`, 'VIEW-VIEWER')
        this.$root.$emit('setDataForWorkspaceTab', stat.ino, directory)

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>