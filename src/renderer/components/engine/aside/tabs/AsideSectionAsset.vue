<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :uploadFile="uploadFile" :contextmenu="contextmenu"
      :configurable="true" v-if="!uploadFileProgress"></treeview>
    <div class="asset-uploading" v-else>
      <sui-progress progress state="active" indicating :percent="uploadFileProgress"></sui-progress>
    </div>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'fs-extra'
  import del from 'del'

  import {
    ipcRenderer,
    shell,
    remote
  } from 'electron'

  import CONTEXTMENU from '../vars/CONTEXTMENU'
  import createUUID from '@static/js/createUUID'

  export default {
    components: {
      Treeview
    },
    data() {
      return {
        path: path.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Assets'),
        uploadFileProgress: 0
      }
    },
    computed: {

      contextmenu() {

        // 삭제 기능을 수정합니다
        // 에셋을 삭제하면 원본 파일도 삭제되어야 합니다
        let newContextmenu
        let delOption


        delOption = {
          force: true
        }

        newContextmenu = [...CONTEXTMENU]
        newContextmenu = newContextmenu.map(t => {

          if (t.text !== '삭제') {
            return t
          }

          t.click = async function (e, itempath) {

            let asset
            let deleted

            let stat

            stat = fs.lstatSync(itempath)

            if (stat.isDirectory()) {

              deleted = ipcRenderer.sendSync('modal-delete', {
                name: path.basename(itempath),
                path: itempath
              })

              if (deleted) {
                await del(itempath, delOption)
              }

              return

            }

            try {
              asset = await fs.readJSON(itempath)
            } catch (e) {
              dialog.showErrorBox(e.message, e.stack)
              return
            }

            // asasset 파일을 삭제합니다
            deleted = ipcRenderer.sendSync('modal-delete', {
              name: path.basename(itempath),
              path: itempath
            })


            // 삭제했다면 원본 파일도 삭제합니다
            if (!deleted) {
              return
            }

            await del(path.join(this.assetSources, asset.id + asset.ext), delOption)

          }

        })

        return [{
            text: '에셋 추가',
            click(e, itempath) {
              this.uploadFile(itempath)
            }
          },
          {
            separator: true
          },
          ...CONTEXTMENU
        ]
      },

      assetSources() {

        let projectDirectory
        let directory

        projectDirectory = ipcRenderer.sendSync('var-get-sync', 'project.directory')
        directory = path.join(projectDirectory, 'AssetSources')

        return directory

      }

    },
    methods: {

      async openItem(itempath) {

        let src
        let asset

        try {
          asset = await fs.readJSON(itempath)
        } catch (e) {
          remote.dialog.showErrorBox(e.message, e.stack)
          return
        }

        src = path.join(this.assetSources, asset.id + asset.ext)

        shell.openItem(src)

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
            extensions: ['png', 'jpg', 'jpeg', 'gif', 'mp3', 'mp4', 'woff', 'woff2']
          }],
          properties: ['openFile', 'multiSelections'],
          defaultPath: os.homedir()
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

          let filename, fileext
          let asset
          let alreadyExists, beforeFile


          filename = path.basename(file)
          fileext = path.extname(file)
          asset = path.join(directory, filename)

          alreadyExists = fs.existsSync(asset)


          // 같은 위치에 이미 파일일 존재하고 있다면 덮어쓰기 위해
          // AssetSources 위치의 원본 파일을 삭제합니다
          if (alreadyExists) {

            try {

              beforeFile = await fs.readJSON(asset)

              await del(path.join(this.assetSources, beforeFile.id + beforeFile.ext), {
                force: true
              })

            } catch (e) {
              errors.push(e)
              continue
            }

          }


          // 파일을 복사합니다
          // 파일의 이름은 UUID로 변경되어 assetSources 디렉토리로 복사됩니다.
          let uuid
          let dist
          let contents

          uuid = beforeFile ? beforeFile.id : createUUID()
          dist = path.join(this.assetSources, uuid + fileext)

          contents = {
            id: uuid,
            ext: fileext
          }

          try {

            await fs.copy(file, dist)

          } catch (e) {
            errors.push(e)
            continue
          }

          await fs.writeJSON(asset, contents, {
            spaces: 2
          })

          this.uploadFileProgress = ~~((current / max) * 100)

        }

        this.uploadFileProgress = 0

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';

  .aside-section-tab {
    .asset-uploading {
      padding: 10px;
    }
  }
</style>