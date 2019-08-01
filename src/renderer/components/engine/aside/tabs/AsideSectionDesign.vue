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
  import DESIGN_LIST from '../../main/workspace/Templates/js/DESIGN_LIST'


  let extensions = ''

  for (let p in DESIGN_LIST) {
    extensions += `(\\${DESIGN_LIST[p].ext})|`
  }

  extensions = extensions.substr(0, extensions.length - 1)
  extensions = new RegExp(extensions, '')


  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: path.posix.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Designs'),
      filter: {
        extensions
      }
    }),
    computed: {

      contextmenu() {
        return [{
            text: '디자인 추가',
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

        let ext
        let stat

        ext = path.extname(itempath)
        stat = fs.lstatSync(itempath)

        this.$root.$emit('createWorkspaceTab', stat.ino, `${path.basename(itempath)} 디자인 수정`, `DESIGN-EDITOR`)
        this.$root.$emit('setDataForWorkspaceTab', stat.ino, {
          id: stat.ino,
          path: itempath
        })

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

        this.$root.$emit('createWorkspaceTab', stat.ino, `${dirname} 에 디자인 생성`, 'DESIGN-CREATOR')
        this.$root.$emit('setDataForWorkspaceTab', stat.ino, {
          id: stat.ino,
          directory
        })

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>