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
      <v-alert :value="!isActor" type="error">
        이 기능은 액터 클래스에서만 사용할 수 있습니다.
      </v-alert>
    </v-card>
    <!-- 모달 데이터 수정 -->
    <v-dialog v-model="modifyMode">
      <v-card style="overflow:hidden">
        <div style="position:relative">
          <canvas v-show="assetSrc" :width="imageWidth" :height="imageHeight" :id="getCanvasId"
            @click="setModifySpot"></canvas>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import electron from 'electron'
  import fs from 'fs-extra'
  import path from 'path'
  import Lve from 'lve'

  import createUUID from '@static/js/createUUID'
  import createItem from '@static/js/createItem'
  import DESIGN_SPOT from './js/DESIGN_SPOT'

  export default {

    props: ['data', 'requestReadFile', 'updateTimestamp'],
    data: () => ({

      lve: new Lve,
      uuid: createUUID(),

      spot: null,
      modifyMode: false,
      modifyProperty: null,
      modifyValue: null,

      assetId: null,
      assetSrc: null,
      assetObject: null,

      imageWidth: 0,
      imageHeight: 0,
      pointX: 0,
      pointY: 0,

    }),

    computed: {

      isActor() {
        return path.extname(this.data.path) === '.esdesign_actor'
      },

      isNeededAsset() {
        return
      },

      getCanvasId() {
        return 'template-designeditor-spot-' + this.uuid
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

        await this.drawImageToCanvas()

        this.pointX = v[0]
        this.pointY = v[1]

      },

      async setModifySpot(e) {

        let x, y

        x = e.offsetX / e.currentTarget.width
        y = e.offsetY / e.currentTarget.height

        this.modifyValue = [x, y]
        this.pointX = x
        this.pointY = y

      },

      initCanvas() {

        this.lve.init({
          canvas: `#${this.getCanvasId}`
        })

        this.lve('__system_camera__').create({
          type: 'camera'
        }).use()

        this.lve('__system_spot__').create({
          type: 'circle'
        }).css({
          borderWidth: 3,
          borderColor: 'red',
          position: 'fixed',
          color: 'transparent',
          verticalAlign: 'middle',
          zIndex: 1,
          pointerEvents: false
        })

      },

      async drawImageToCanvas() {

        let o, sample
        let el
        let calc

        return new Promise(resolve => {

          this.lve('__system_asset_sample__').remove()

          el = document.documentElement

          o = this.requestReadFile()
          o.src = this.assetSrc

          sample = this.lve('__system_asset_sample__').create(o)
          sample.css('verticalAlign', 'middle')
          sample.on('load', (e) => {

            el = document.documentElement
            calc = this.lve.calcRatio(el.clientWidth, el.clientHeight, sample.width(), sample.height(), 0.8)

            this.imageWidth = calc.width
            this.imageHeight = calc.height
            this.pointX = this.pointX
            this.pointY = this.pointY

            sample.css({
              width: this.imageWidth,
              height: this.imageHeight
            })

            if (sample.type === 'sprite') {
              sample.play()
            }

            resolve()

          })

        })

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

      pointX() {
        this.lve('__system_spot__').css('left', this.imageWidth * this.pointX - 50)
      },

      pointY() {
        this.lve('__system_spot__').css('bottom', this.imageHeight * (1 - this.pointY))
      },

      updateTimestamp() {

        if (this.lve.getRenderStates().ready) {
          this.lve.destroy()
          this.lve = new Lve
        }

        this.getInformation()
        this.initCanvas()
        this.drawImageToCanvas()

      }

    },

    created() {
      window.addEventListener('resize', this.drawImageToCanvas)
    },

    mounted() {

      this.getInformation()
      this.initCanvas()
      this.drawImageToCanvas()

    },

    beforeDestroy() {
      this.lve.destroy()
    },

    destroyed() {
      window.removeEventListener('resize', this.drawImageToCanvas)
    }

  }
</script>

<style lang="scss" scoped>
  .information-description {
    font-size: small;
  }

  canvas {
    margin: 0 auto;
    display: block;
  }
</style>