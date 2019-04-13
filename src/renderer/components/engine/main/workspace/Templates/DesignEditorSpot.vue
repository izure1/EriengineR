<template>
  <section>
    <v-card class="my-5">
      <v-card-title class="headline">액터 포인트</v-card-title>
      <v-card-text>
        이 디자인으로 만들어진 객체의 <span class="light-green--text">특정 부분 위치</span>를 지정합니다.
        <br>
        스크립트의 <span class="light-green--text">특정 부분 위치 확대</span> 기능을 사용하여 액터의 원하는 부분을 쉽게 확대할 수 있습니다.
      </v-card-text>
      <div v-if="isActor">
        <div v-if="isImageType">
          <div v-if="assetId">
            <v-list one-line dense>
              <v-list-tile v-for="(value, property) in spot" :key="property" @click="setModifyItem(property, value)">
                <v-list-tile-avatar>
                  <v-icon color="grey">arrow_right</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span class="light-green--text">{{ property }}</span>
                    <span class="grey--text ml-2 caption">{{ getSpotDescription(value) }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
          <div v-else>
            <v-alert :value="true" type="error">
              아직 이 디자인의 에셋이 지정되지 않았습니다.
              <br>
              먼저 에셋을 지정해주세요.
            </v-alert>
          </div>
        </div>
        <v-alert :value="!isImageType" type="error">
          이 기능은 이미지 타입에서만 사용할 수 있습니다.
        </v-alert>
      </div>
      <v-alert :value="!isActor" type="error">
        이 기능은 액터 클래스에서만 사용할 수 있습니다.
      </v-alert>
    </v-card>
    <!-- 모달 데이터 수정 -->
    <v-dialog max-width="50%" v-model="modifyMode">
      <v-card style="overflow:hidden">
        <div style="position:relative">
          <v-img v-if="assetSrc" :src="assetSrc" :aspect-ratio="16/9" contain @click="setModifySpot"
            @mousemove="updateImageInformation" class="my-4"></v-img>
          <div :style="{'left': getSpotPositionX, 'top': getSpotPositionY}" class="spot-point"></div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import electron from 'electron'
  import fs from 'fs-extra'
  import path from 'path'

  import createItem from '@static/js/createItem'
  import DESIGN_SPOT from './js/DESIGN_SPOT'

  export default {

    props: ['data', 'requestReadFile', 'updateTimestamp'],
    data: () => ({
      spot: null,
      modifyMode: false,
      modifyProperty: null,
      modifyValue: null,
      assetId: null,
      assetSrc: null,
      modalWidth: 0,
      modalHeight: 0,
      imageWidth: 0,
      imageHeight: 0,
      pointX: 100,
      pointY: 100,
      imageOffsetX: 0,
      imageOffsetY: 0
    }),

    computed: {

      isActor() {
        return path.extname(this.data.path) === '.esdesign_actor'
      },

      isImageType() {
        return this.requestReadFile(true).type === 'image'
      },

      isWidthBigger() {

        let imageS, modalS

        imageS = this.imageWidth / this.imageHeight
        modalS = this.modalWidth / this.modalHeight

        return imageS > modalS

      },

      getSpotPositionX() {
        return this.imageOffsetX + (this.imageWidth * this.pointX) - 50 + 'px'
      },

      getSpotPositionY() {
        return this.imageOffsetY + (this.imageHeight * this.pointY) - 50 + 'px'
      }

    },

    methods: {

      copyJSON(o) {
        return JSON.parse(JSON.stringify(o))
      },

      getInformation() {

        let information = this.requestReadFile()

        this.spot = Object.assign({}, DESIGN_SPOT, information.__spot)

        this.assetId = information.__asset
        this.assetSrc = electron.ipcRenderer.sendSync('design-get-asset-file', information.__id)

      },

      getSpotDescription(v) {
        return v.map(p => Math.floor((p * 1000)) / 10 + '%').join(', ')
      },

      async setModifyItem(u, v) {

        this.modifyMode = true
        this.modifyProperty = u

        this.pointX = v[0]
        this.pointY = v[1]

      },

      getImageSize(src) {

        let img

        return new Promise((resolve, reject) => {

          img = new Image()
          img.onload = function () {
            resolve([this.naturalWidth, this.naturalHeight])
          }
          img.onerror = function (e) {
            reject(e)
          }

          img.src = src

        })

      },

      async updateImageInformation(e) {

        let modal, img

        modal = e.currentTarget.getBoundingClientRect()
        img = await this.getImageSize(this.assetSrc)

        let modalW, modalH, modalS
        let imageW, imageH, imageS
        let startX, startY

        modalW = modal.width
        modalH = modal.height

        imageS = img[0] / img[1]
        modalS = modalW / modalH

        if (this.isWidthBigger) {
          imageW = modalW
          imageH = imageW / imageS
        } else {
          imageH = modalH
          imageW = imageH * imageS
        }

        startX = (modalW - imageW) / 2
        startY = (modalH - imageH) / 2


        this.modalWidth = modalW
        this.modalHeight = modalH
        this.imageWidth = imageW
        this.imageHeight = imageH
        this.imageOffsetX = startX
        this.imageOffsetY = startY

      },

      async setModifySpot(e) {

        let x, y

        await this.updateImageInformation(e)

        x = e.offsetX - this.imageOffsetX
        y = e.offsetY - this.imageOffsetY

        if (x < 0) x = 0
        if (y < 0) y = 0

        x /= this.imageWidth
        y /= this.imageHeight

        this.pointX = x
        this.pointY = y
        this.modifyValue = [x, y]

      }


    },

    watch: {

      modifyValue() {

        let information
        let x, y

        x = this.modifyValue[0]
        y = this.modifyValue[1]

        information = this.requestReadFile()
        information.__spot[this.modifyProperty] = [x, y]

        fs.writeJSONSync(this.data.path, information, {
          spaces: 2
        })

        this.getInformation()

      },

      updateTimestamp() {
        this.getInformation()
      }

    },

    mounted() {
      this.getInformation()
    }

  }
</script>

<style lang="scss" scoped>
  .information-description {
    font-size: small;
  }

  .spot-point {
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    border: 3px solid red;
    pointer-events: none;
  }
</style>