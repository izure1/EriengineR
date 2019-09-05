<template>
  <div class="script-viewer-action">
    <h1 class="headline px-3 my-3">스크립트 뷰어</h1>
    <v-alert border="left" text tile icon="notification_important" prominent class="mt-3 body-2">
      스크립트 파일을 분류에 따라 폴더로 나누세요.
      <br>
      <span class="font-weight-bold light-green--text">폴더를 우클릭하여 스크립트 뷰어 열기를 선택</span>하여, 스크립트를 관리하세요.
    </v-alert>
    <treeview :path="data.directory" :filter="filter" :configurable="true" :contextmenu="contextmenu"></treeview>
  </div>
</template>

<script>
  import path from 'path'
  import fs from 'fs-extra'

  import ScriptViewer from './ScriptViewer'
  import Treeview from '@/components/treeview/Treeview'

  import createUUID from '@common/js/createUUID'

  export default {

    components: {
      ScriptViewer,
      Treeview
    },

    props: ['data'],
    data: () => ({
      filter: {
        extensions: /\.esscript/
      }
    }),

    computed: {

      contextmenu() {

        let contextmenu
        let menus

        let selectDirMenu
        let selectScriptMenu

        contextmenu = new Treeview.Contextmenu
        menus = Treeview.Contextmenu.createDefaultMenus()

        // 스크립트를 편집할 폴더 선택 메뉴 생성하기
        selectDirMenu = new Treeview.ContextmenuItem('selectDirMenu', '이 폴더에서 스크립트 뷰어 열기')
        selectDirMenu.setOption({
          onlyDirectory: true
        }).click(function (e, itempath) {

          let id
          let directory

          id = createUUID()
          directory = itempath

          this.$root.$emit('createWorkspaceTab', id, `${path.basename(itempath)} 스크립트 편집기`, `SCRIPT-VIEWER`)
          this.$root.$emit('setDataForWorkspaceTab', id, {
            directory
          })

        })


        // 특정 스크립트 편집 선택 메뉴 생성하기
        selectScriptMenu = new Treeview.ContextmenuItem('selectScriptMenu', '이 스크립트 편집')
        selectScriptMenu.setOption({
          onlyFile: true
        }).click(function (e, itempath) {

          let id
          let directory, script

          id = createUUID()
          directory = path.dirname(itempath)
          script = fs.readJSONSync(itempath)

          this.$root.$emit('createWorkspaceTab', id, `${path.basename(itempath)} 스크립트 편집기`, `SCRIPT-EDITOR`)
          this.$root.$emit('setDataForWorkspaceTab', id, {
            directory,
            script
          })

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

    }


  }
</script>

<style lang="scss" scoped>
  .script-viewer-action {
    width: 100%;
    height: 100%;
  }
</style>