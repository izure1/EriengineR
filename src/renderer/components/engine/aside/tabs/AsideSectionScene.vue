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

  import createUID from '@common/js/createUID'
  import createItem from '@common/js/createItem'

  import {
    ipcRenderer,
    shell
  } from 'electron'


  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: ipcRenderer.sendSync('scene-get-directory', 0),
      filter: {
        extensions: /\.esscene/
      }
    }),
    computed: {

      contextmenu() {


        let contextmenu
        let menus

        contextmenu = new Treeview.Contextmenu
        menus = Treeview.Contextmenu.createDefaultMenus()


        let addSceneMenu
        let editSceneMenu
        let writeSceneMenu

        addSceneMenu = new Treeview.ContextmenuItem('addScene', '씬 추가')
        editSceneMenu = new Treeview.ContextmenuItem('editScene', '씬 디자인 편집')
        writeSceneMenu = new Treeview.ContextmenuItem('writeScene', '씬 스크립트 편집')


        addSceneMenu.setOption({
          onlyDirectory: true
        }).click(function (e, itempath) {
          this.createSceneFile(itempath)
        })

        editSceneMenu.setOption({
          onlyFile: true
        }).click(function (e, itempath) {
          this.openSceneDesigner(itempath)
        })

        writeSceneMenu.setOption({
          onlyFile: true
        }).click(function (e, itempath) {
          this.openScriptViewer(itempath)
        })


        contextmenu.extend(addSceneMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(editSceneMenu)
        contextmenu.extend(writeSceneMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(menus)

        return contextmenu.render()

      }

    },
    methods: {

      openItem(itempath) {
        this.openSceneDesigner(itempath)
        this.openScriptViewer(itempath)
      },

      createSceneFile(itempath) {

        let sceneId
        let scenePath
        let sceneExt

        sceneId = createUID()
        scenePath = path.posix.join(itempath, sceneId)
        sceneExt = '.esscene'

        fs.writeFileSync(scenePath + sceneExt, sceneId)
        ipcRenderer.sendSync('scene-add-directory', sceneId)

      },

      openScriptViewer(itempath) {

        let sceneId, sceneName, sceneDirectory
        let ScenesMaps

        ScenesMaps = ipcRenderer.sendSync('scene-get-directory', 1)

        sceneId = fs.readFileSync(itempath, 'utf8')
        sceneName = path.parse(itempath).name
        sceneDirectory = path.join(ScenesMaps, sceneId)

        // 삭제되었을 경우를 상정하여 새롭게 생성하기
        ipcRenderer.sendSync('scene-add-directory', sceneId)

        this.$root.$emit('createWorkspaceTab', sceneId, `${sceneName} 씬 스크립트 뷰어 선택`, 'SCRIPT-VIEWER-ACTION')
        this.$root.$emit('setDataForWorkspaceTab', sceneId, {
          directory: sceneDirectory
        })

      },

      openSceneDesigner(itempath) {

      }

    }
    
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>