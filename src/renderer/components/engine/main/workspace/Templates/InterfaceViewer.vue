<template>
  <section class="template-interfaceviewer">
    <section :id="getToolboxId" class="template-interfaceviewer-toolbox">
    </section>
    <section class="template-interfaceviewer-canvas">
      <canvas :id="getCanvasId"></canvas>
    </section>
  </section>
</template>

<script>
  import createUUID from '@static/js/createUUID'
  import {
    jsPlumb
  } from 'jsplumb'


  import getCanvasId from './methods/InterfaceViewer/getCanvasId'
  import getToolboxId from './methods/InterfaceViewer/getToolboxId'
  import setDraggableToolbox from './methods/InterfaceViewer/setDraggableToolbox'

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
  .template-interfaceviewer {
    position: relative;
  }

  .template-interfaceviewer-toolbox {
    width: 230px;
    height: 400px;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    position: absolute;
    padding: 10px;
  }

  .template-interfaceviewer-canvas {

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>