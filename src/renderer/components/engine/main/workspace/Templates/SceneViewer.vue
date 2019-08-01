<template>
  <section class="template-sceneviewer" @click="focusCanvas">
    <!-- <section :id="getToolboxId" class="template-sceneviewer-toolbox"></section> -->
    <section class="template-sceneviewer-aside">
      <div v-for="(job, index) in jobButtons" :key="index">
        <v-divider v-if="job.seperator" class="my-1"></v-divider>
        <v-tooltip right v-else>
          <template v-slot:activator="{on}">
            <v-btn icon v-on="on" @click="job.click">
              <v-icon>{{ job.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ job.alt }}</span>
        </v-tooltip>
      </div>
    </section>
    <section class="template-sceneviewer-canvas mt-2">
      <canvas :id="getCanvasId" :width="canvasWidth" :height="canvasHeight" @keydown="moveCamera" tabindex="1"></canvas>
    </section>
    <v-dialog v-model="settingMode" max-width="75%">
      <v-card>
        <v-card-title primary-title>
          <h6 class="headline">설정</h6>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="cameraMoveGap" label="카메라 속도" hint="키보드로 카메라를 움직일 떄 속도를 지정합니다" type="number"
            color="orange">
          </v-text-field>
          <v-spacer class="my-3"></v-spacer>
          <v-text-field v-model="gridGap" label="격자 크기" hint="격자의 크기를 조절합니다" type="number" color="orange">
          </v-text-field>
          <v-spacer class="my-3"></v-spacer>
          <v-text-field v-model="gridColor" label="격자 색상" hint="격자의 색상을 설정합니다. rgb, rgba, hash 등을 사용할 수 있습니다"
            color="orange">
          </v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import createUUID from '@static/js/createUUID'
  import {
    jsPlumb
  } from 'jsplumb'
  import Lve from 'lve'


  import getCanvasId from './methods/SceneViewer/getCanvasId'
  import getToolboxId from './methods/SceneViewer/getToolboxId'
  import getValidGridGap from './methods/SceneViewer/getValidGridGap'

  import clickHandler from './methods/SceneViewer/clickHandler'
  import setCanvasSize from './methods/SceneViewer/setCanvasSize'
  import setCanvasInit from './methods/SceneViewer/setCanvasInit'
  import moveCamera from './methods/SceneViewer/moveCamera'
  import drawGridLine from './methods/SceneViewer/drawGridLine'
  import focusCanvas from './methods/SceneViewer/focusCanvas'

  import setDraggableToolbox from './methods/SceneViewer/setDraggableToolbox'

  export default {
    components: {},
    data() {
      return {

        lve: new Lve,

        canvasWidth: 0,
        canvasHeight: 0,

        cameraMoveGap: 150,
        cameraMoveGapMax: 500,
        cameraMoveGapMin: 10,

        settingMode: false,

        gridGap: 20,
        gridGapMin: 10,
        gridColor: 'rgba(0, 0, 0, 0.1)',

        uuid: createUUID(),
        jsPlumb: jsPlumb.getInstance(),

        jobButtons: [{
            alt: '액터 편집',
            icon: 'person'
          },
          {
            alt: '인터페이스 편집',
            icon: 'web_asset'
          },
          {
            alt: '배경 편집',
            icon: 'photo'
          },
          {
            seperator: true
          },
          {
            alt: '새로고침',
            icon: 'refresh',
            click: () => {
              this.setCanvasInit()
            }
          },
          {
            alt: '설정',
            icon: 'settings',
            click: () => {
              this.settingMode = true
            }
          }
        ]

      }
    },
    computed: {
      getCanvasId,
      getToolboxId,
      getValidGridGap
    },
    methods: {
      setDraggableToolbox,
      clickHandler,
      setCanvasSize,
      setCanvasInit,
      moveCamera,
      drawGridLine,
      focusCanvas
    },

    mounted() {

      this.setDraggableToolbox()
      this.setCanvasSize()
      this.setCanvasInit()
      this.focusCanvas()

    },

    beforeDestroy() {
      this.lve.destroy()
    }

  }
</script>

<style lang="scss" scoped>
  .template-sceneviewer {
    height: 100%;
    padding: 20px;
    padding-left: 50px;
    box-sizing: border-box;
  }

  .template-sceneviewer-aside {
    width: 50px;
    height: 100%;
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px 0;
    left: 0;
    top: 0;
  }

  .template-sceneviewer-toolbox {
    width: 230px;
    height: 400px;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    position: absolute;
    padding: 10px;
  }

  .template-sceneviewer-canvas {

    canvas {
      display: block;
    }

  }
</style>