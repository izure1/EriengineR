<template>
  <v-card>
    <v-card-title class="headline">에셋</v-card-title>
    <v-card-text>
      이 디자인이 기본적으로 가질 에셋을 지정합니다.
      <br>
      가령 이미지 타입의 디자인이라면, 이곳에서 이미지 파일을 선택해야 합니다.
    </v-card-text>
    <div v-if="isNeededSrc">
      <div class="my-3">
        <div v-if="!asset">
          <treeview :filter="getAssetFilter" :path="assetDirectory" :openItem="selectAsset" :configurable="false"></treeview>
        </div>
        <div v-else>
          <v-card-actions>
            <v-btn @click="showAssetMode = true">
              <v-icon>camera</v-icon>지정된 에셋 보기
            </v-btn>
            <v-btn @click="removeAsset" color="warning">
              <v-icon>delete_forever</v-icon>에셋 재지정
            </v-btn>
          </v-card-actions>
          <v-dialog v-model="showAssetMode" max-width="60%">
            <v-card>
              <v-img :src="getAssetFile(asset)"></v-img>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-alert :value="!asset" type="warning">
        이 타입의 객체는 반드시 에셋을 지정해야 합니다.
        <br>
        상단에서 에셋을 선택하세요.
      </v-alert>
    </div>
    <div v-else>
      <v-alert :value="!isNeededSrc" type="success">
        이 디자인은 {{ designType }} 타입이므로 에셋을 지정할 필요가 없습니다.
      </v-alert>
    </div>
  </v-card>
</template>

<script>
  import electron from 'electron'
  import fs from 'fs-extra'
  import Treeview from '@/components/treeview/Treeview'

  export default {

    components: {
      Treeview
    },
    props: ['data', 'requestReadFile'],
    data: () => ({

      designType: null,

      assetSrc: null,
      asset: null,
      assetDirectory: null,

      showAssetMode: null

    }),

    computed: {

      isNeededSrc() {
        return !!this.assetSrc
      },

      getAssetFilter() {
        return {
          extensions: new RegExp(this.assetSrc, 'i')
        }
      }

    },

    methods: {

      getInformation() {

        let information

        information = this.requestReadFile()

        this.designType = information.type
        this.asset = information.__asset
        this.assetSrc = information.__assetSrc
        this.assetDirectory = electron.ipcRenderer.sendSync('asset-get-directory')

      },

      getAssetFile() {
        return electron.ipcRenderer.sendSync('asset-get-file', this.asset)
      },

      selectAsset(p) {

        let asset
        let id, ext

        asset = fs.readJSONSync(p)
        id = asset.id
        ext = asset.ext

        this.asset = id
        this.saveAsset(this.asset)

      },

      removeAsset() {
        this.saveAsset(null)
      },

      saveAsset(v) {

        let information

        information = this.requestReadFile()
        information.__asset = v

        fs.writeJSONSync(this.data.path, information, {
          spaces: 2
        })

        this.getInformation()

      }

    },

    created() {

      this.getInformation()

    }

  }
</script>

<style lang="scss" scoped>

</style>