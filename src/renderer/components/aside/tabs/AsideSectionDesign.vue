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

  import DESIGN_LIST from '@/components/workspace-templates/js/DESIGN_LIST'


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
      path: path.join(ipcRenderer.sendSync('project-get-directory'), 'Designs'),
      filter: {
        extensions
      }
    }),
    computed: {

      contextmenu() {

        let contextmenu
        let menus

        contextmenu = new Treeview.Contextmenu
        menus = Treeview.Contextmenu.createDefaultMenus()


        let addDesignMenu

        addDesignMenu = new Treeview.ContextmenuItem('addDesign', '디자인 추가').setOption({
          onlyDirectory: true
        }).click(function (e, itempath) {
          this.openViewer(itempath)
        })

        contextmenu.extend(addDesignMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(menus)

        return contextmenu.render()

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
        directory = itempath

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