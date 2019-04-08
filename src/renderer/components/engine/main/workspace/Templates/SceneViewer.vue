<template>
  <section class="template-sceneviewer">
    <section :id="getToolboxId" class="template-sceneviewer-toolbox">
    </section>
    <section class="template-sceneviewer-canvas">
      <canvas :id="getCanvasId"></canvas>
    </section>
  </section>
</template>

<script>
  import createUUID from '@static/js/createUUID'
  import {
    jsPlumb
  } from 'jsplumb'


  import getCanvasId from './methods/SceneViewer/getCanvasId'
  import getToolboxId from './methods/SceneViewer/getToolboxId'
  import setDraggableToolbox from './methods/SceneViewer/setDraggableToolbox'

  export default {
    components: {},
    data: () => ({
      uuid: createUUID(),
      jsPlumb: jsPlumb.getInstance(),
      ff: null,
      test: [{
          key: 'test',
          text: 'asdf',
          value: 'test'
        },
        {
          key: 'asdf',
          text: 'fuck',
          value: 'fuck'
        }
      ]
    }),
    computed: {
      getCanvasId,
      getToolboxId
    },
    methods: {
      setDraggableToolbox
    },
    mounted() {
      this.setDraggableToolbox()
    }
  }
</script>

<style lang="scss" scoped>
  .template-sceneviewer {
    position: relative;
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
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>