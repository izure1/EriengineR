<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :contextmenu="contextmenu"
      :configurable="true">
    </treeview>
  </div>
</template>

<script>
  import Treeview from '@/components/Treeview/Component'
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

      getSceneScriptInformation(itempath) {

        let id, name, directory

        id = fs.readFileSync(itempath, 'utf8')
        name = path.parse(itempath).name
        directory = ipcRenderer.sendSync('scene-get-directory-script', id)

        // 삭제되었을 경우를 상정하여 새롭게 생성하기
        ipcRenderer.sendSync('scene-add-directory', id)

        return {
          id,
          name,
          directory
        }

      },

      getSceneActorInformation(itempath) {

        let id, name, directory

        id = fs.readFileSync(itempath, 'utf8')
        name = path.parse(itempath).name
        directory = ipcRenderer.sendSync('scene-get-directory-actor', id)

        // 삭제되었을 경우를 상정하여 새롭게 생성하기
        ipcRenderer.sendSync('scene-add-directory', id)

        return {
          id,
          name,
          directory
        }

      },

      openScriptViewer(itempath) {

        let {
          id,
          name,
          directory
        } = this.getSceneScriptInformation(itempath)

        let action = {
          name: `${name} 씬 스크립트 관리자`,
          directory: 'SCRIPT-VIEWER',
          file: 'SCRIPT-EDITOR',
          extensions: /\.esscript/,
        }

        let tabId = `${id}-FOR-SCRIPT`

        this.$root.$emit('create-workspace', tabId, action.name, 'SCRIPT-VIEWER-ACTION')
        this.$root.$emit('set-data-workspace', tabId, {
          id,
          name,
          directory,
          action,
        })

      },

      openSceneDesigner(itempath) {

        let {
          id,
          name,
          directory
        } = this.getSceneActorInformation(itempath)

        let action = {
          name: `${name} 씬 액터 관리자`,
          directory: 'ACTOR-VIEWER',
          file: 'ACTOR-EDITOR',
          extensions: /\.esactor/,
        }

        let tabId = `${id}-FOR-ACTOR`

        this.$root.$emit('create-workspace', tabId, action.name, 'SCRIPT-VIEWER-ACTION')
        this.$root.$emit('set-data-workspace', tabId, {
          id,
          name,
          directory,
          action,
        })

      }

    }

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/aside-section-tab.scss';
</style>