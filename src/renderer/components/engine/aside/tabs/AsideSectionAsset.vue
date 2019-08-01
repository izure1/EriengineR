<template>
  <div class="aside-section-tab">
    <treeview :path="path" :openItem="openItem" :uploadFile="uploadFile" :contextmenu="contextmenu"
      :configurable="true" v-if="!uploadFileProgress"></treeview>
    <div class="asset-uploading" v-else>
      <v-progress-circular rotate="-90" width="3" size="150" :value="uploadFileProgress" color="orange">{{
        uploadFileProgress }}%</v-progress-circular>
    </div>
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
    remote
  } from 'electron'

  import CONTEXTMENU from '../vars/CONTEXTMENU'
  import createUUID from '@static/js/createUUID'

  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: ipcRenderer.sendSync('asset-get-directory'),
      uploadFileProgress: 0
    }),
    computed: {

      contextmenu() {

        // 삭제 기능을 수정합니다
        // 에셋을 삭제하면 원본 파일도 삭제되어야 합니다
        let newContextmenu


        newContextmenu = new CONTEXTMENU
        newContextmenu = newContextmenu.map(t => {

          if (t.text !== '삭제') {
            return t
          }

          t.click = async function (e, itempath) {

            let asset
            let deleted

            let stat

            stat = fs.lstatSync(itempath)

            // 디렉토리를 삭제하는 경우
            if (stat.isDirectory()) {

              let assets

              assets = await fg('**/*.*', {
                cwd: itempath,
                absolute: true
              })
              assets = await this.getAssetData(assets)

              deleted = ipcRenderer.sendSync('modal-delete', {
                name: path.basename(itempath),
                path: itempath
              })

              // 디렉토리를 삭제하면 해당 디렉토리에 있던 모든 에셋의 정보를 기반으로
              // 원본 에셋 파일까지 제거합니다
              if (deleted) {
                for (let asset of assets) {
                  await this.dropFile(asset)
                }
              }

              return

            }


            // 개별 파일을 삭제하는 경우
            try {
              asset = await this.getAssetData(itempath)
              asset = asset[0]
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

            if (!asset) {
              return
            }

            await this.dropFile(asset)

          }

          return t

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
          ...newContextmenu
        ]

      },

      assetSources() {

        let projectDirectory
        let directory

        projectDirectory = ipcRenderer.sendSync('var-get-sync', 'project.directory')
        directory = path.posix.join(projectDirectory, 'AssetSources')

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

        src = path.posix.join(this.assetSources, asset.id + asset.ext)

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

          let filename, fileext
          let asset
          let alreadyExists, beforeFile


          filename = path.basename(file)
          fileext = path.extname(file)
          asset = path.posix.join(directory, filename)

          alreadyExists = fs.existsSync(asset)


          // 같은 위치에 이미 파일일 존재하고 있다면 덮어쓰기 위해
          // AssetSources 위치의 원본 파일을 삭제합니다
          if (alreadyExists) {

            try {

              beforeFile = await this.getAssetData(asset)
              beforeFile = beforeFile[0]

              await this.dropFile(beforeFile)

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
          dist = path.posix.join(this.assetSources, uuid + fileext)

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

          fs.writeJSONSync(asset, contents, {
            spaces: 2
          })

          this.uploadFileProgress = ~~((current / max) * 100)

        }

        this.uploadFileProgress = 0

      },

      async dropFile(asset) {

        let file
        let option

        file = path.posix.join(this.assetSources, asset.id + asset.ext)
        option = {
          force: true
        }

        await del(file, option)

      },

      async getAssetData(assets) {

        let ret = []

        if (!Array.isArray(assets)) {
          assets = [assets]
        }

        for (let i = 0, len = assets.length, asset; i < len; i++) {

          asset = assets[i]
          asset = await fs.readJSON(asset)

          ret.push(asset)

        }

        return ret

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';

  .aside-section-tab {
    .asset-uploading {
      .v-progress-circular {
        font-size: 20px;
        letter-spacing: -1px;
        text-align: center;
        margin: 30px auto;
        display: block;
      }
    }
  }
</style>