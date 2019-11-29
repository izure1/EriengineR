<template>
  <div class="script-viewer-action">
    <h1 class="headline px-3 my-3">
      <span class="light-green--text">{{ actionName }}</span>
    </h1>
    <v-alert border="left" text tile icon="notification_important" prominent class="mt-3 body-2">
      폴더를 만들어 파일을 분류하세요.
      <br>
      폴더를 우클릭하여 <span class="font-weight-bold light-green--text">이 폴더에서 뷰어 열기</span>를 선택하여, 파일을 관리하세요.
    </v-alert>
    <v-alert border="left" tile icon="notification_important" color="warning" class="mt-3 body-2">
      여기에서 만든 파일은, 이 씬에서만 작동합니다. 다른 씬에 영향을 미치지 못하니 유의하세요.
    </v-alert>
    <treeview :path="data.directory" :filter="filter" :configurable="true" :openItem="modifyFile"
      :contextmenu="contextmenu"></treeview>
  </div>
</template>

<script>
  import path from 'path'
  import fs from 'fs-extra'

  import ScriptViewer from '@/components/Template-ScriptViewer/Component'
  import Treeview from '@/components/Treeview/Component'

  import createUUID from '@common/js/createUUID'

  export default {

    components: {
      ScriptViewer,
      Treeview
    },

    props: ['data'],

    computed: {

      actionName() {
        return this.data.action.name
      },

      filter() {

        let {
          extensions
        } = this.data.action

        return {
          extensions
        }

      },

      contextmenu() {

        let contextmenu
        let menus

        let selectDirMenu
        let selectScriptMenu

        contextmenu = new Treeview.Contextmenu
        menus = Treeview.Contextmenu.createDefaultMenus()

        // 편집할 폴더 선택 메뉴 생성하기
        selectDirMenu = new Treeview.ContextmenuItem('selectDirMenu', '이 폴더에서 뷰어 열기')
        selectDirMenu.setOption({
          onlyDirectory: true
        }).click(function (e, itempath) {
          this.openViewer(itempath)
        })


        // 특정 스크립트 편집 선택 메뉴 생성하기
        selectScriptMenu = new Treeview.ContextmenuItem('selectFileMenu', '이 파일 편집')
        selectScriptMenu.setOption({
          onlyFile: true
        }).click((e, itempath) => {
          this.modifyFile(itempath)
        })

        contextmenu.extend(selectDirMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(selectScriptMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(menus)

        return contextmenu.render()

      }

    },

    methods: {

      deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
      },

      // 폴더를 기반으로 작업하는 함수입니다.
      // 가령 스크립트 뷰어, 액터 뷰어 등이 이곳에 해당됩니다.
      openViewer(itempath) {

        let id
        let directory, directoryName

        id = createUUID()
        directory = itempath
        directoryName = path.basename(itempath)

        this.$root.$emit('create-workspace', id, `${directoryName} 편집기`, this.data.action.directory)
        this.$root.$emit('set-data-workspace', id, {
          directory
        })

      },

      // 파일 기반으로 작업하는 함수입니다.
      // 가령 스크립트 편집, 액터 편집 등이 이곳에 해당됩니다.
      modifyFile(itempath) {

        let file
        let tabname

        try {
          file = fs.readJSONSync(itempath)
          tabname = path.basename(itempath)
        } catch (e) {
          throw e
        }

        this.$root.$emit('create-workspace', file.id, tabname, this.data.action.file, {})
        this.$root.$emit('set-data-workspace', file.id, itempath)

      }

    }


  }
</script>

<style lang="scss" scoped>
  .script-viewer-action {
    width: 100%;
    height: 100%;
  }
</style>