<template>
  <div class="aside-section-tab">
    <treeview :path="path" :openItem="openItem" :uploadFile="uploadFile" :contextmenu="contextmenu" :configurable="true"
      v-if="!uploadFileProgress"></treeview>
    <div class="asset-uploading text-center" v-else>
      <v-progress-circular rotate="-90" width="3" size="150" :value="uploadFileProgress" color="orange">{{
        uploadFileProgress }}%</v-progress-circular>
    </div>
    <v-snackbar v-model="assetCopyComplete" timeout="3000">
      <div class="grey--text">
        <span class="white--text mr-1">{{ assetCopyPath }}</span> 에셋 경로 복사 완료!
      </div>
      <v-btn icon @click="assetCopyComplete = false">
        <v-icon color="red">close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'fs-extra'
  import del from 'del'
  import fg from 'fast-glob'

  import {
    ipcRenderer,
    shell,
    remote,
    clipboard
  } from 'electron'

  import createUUID from '@common/js/createUUID'

  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: ipcRenderer.sendSync('asset-get-directory'),
      uploadFileProgress: 0,
      assetCopyPath: '',
      assetCopyComplete: false
    }),
    computed: {

      contextmenu() {

        let contextmenu
        let menus

        contextmenu = new Treeview.Contextmenu
        menus = Treeview.Contextmenu.createDefaultMenus()


        let uploadMenu
        let copyPathMenu

        uploadMenu = new Treeview.ContextmenuItem('upload', '에셋 추가')
        uploadMenu.setOption({
          onlyDirectory: true
        }).click(function (e, itempath) {
          this.uploadFile(itempath)
        })


        copyPathMenu = new Treeview.ContextmenuItem('copyPath', '에셋 경로 복사')
        copyPathMenu.setOption({
          onlyFile: true
        }).click(function (e, itempath) {
          this.assetCopyPath = this.copyAssetPath(itempath)
          this.assetCopyComplete = true
        })


        contextmenu.extend(uploadMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(copyPathMenu)
        contextmenu.extend(Treeview.Contextmenu.createSeparatorMenu())
        contextmenu.extend(menus)

        return contextmenu.render()

      }

    },
    methods: {

      async openItem(itempath) {

        shell.openItem(itempath)

      },

      async uploadFile(itempath) {

        let files

        let directory
        let stat


        stat = fs.lstatSync(itempath)
        directory = stat.isDirectory() ? itempath : path.dirname(itempath)

        files = ipcRenderer.sendSync('modal-open-sync', {
          title: '파일을 선택해주세요',
          filters: [{
            name: '에셋 파일',
            extensions: ['png', 'jpg', 'jpeg', 'gif', 'ogg', 'mp3', 'mp4', 'webm', 'woff', 'woff2']
          }],
          properties: ['openFile', 'multiSelections']
        })

        if (!files) {
          return
        }



        // 에셋을 추가합니다
        // 원본 파일은 파일명을 UUID로 수정하고, AssetSources 디렉토리로 복사합니다
        // 해당 파일의 정보를 담고 있는 esasset 파일을 JSON 형식으로 생성하여 추가합니다
        // 에리엔진에서는 esassset 파일만을 다루어 파일을 관리합니다
        let errors
        let current, max

        errors = []

        current = 0
        max = files.length

        this.uploadFileProgress = 0


        for (let file of files) {

          current++

          let alreadyExists
          let filename, filepath

          filename = path.basename(file)
          filepath = path.join(itempath, filename)
          alreadyExists = fs.existsSync(filepath)

          // 같은 위치에 이미 파일일 존재하고 있다면 덮어쓰기 위해 원본 파일을 삭제합니다
          if (alreadyExists) {

            try {

              await this.dropFile(filepath)

            } catch (e) {
              errors.push(e)
              continue
            }

          }


          // 파일을 복사합니다
          try {

            await fs.copy(file, filepath)

          } catch (e) {
            errors.push(e)
            continue
          }

          this.uploadFileProgress = ~~((current / max) * 100)

        }

        this.uploadFileProgress = 0

      },

      copyAssetPath(itempath) {

        let p = ipcRenderer.sendSync('asset-get-path', itempath)

        clipboard.writeText(p)
        return p

      },

      async dropFile(file) {

        let option

        option = {
          force: true
        }

        await del(file, option)

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';

  .asset-uploading {
    margin-top: 50px;
  }
</style>