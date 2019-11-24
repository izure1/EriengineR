<template>
  <section class="actor-viewer">
    <canvas :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mouseup="onMouseUp"
      @mousemove="onMouseMove" @mousewheel="onMouseWheel" @mouseover="onMouseOver" @mouseout="onMouseOut"
      @click="createActor" @dragenter="onDragEnter" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop"></canvas>
  </section>
</template>

<script>
  import setCanvasResize from './methods/setCanvasResize'
  import initFrame from './methods/initFrame'
  import destroyFrame from './methods/destroyFrame'
  import setResizeObserver from './methods/setResizeObserver'
  import destroyObserver from './methods/destroyObserver'
  import onMouseDown from './methods/onMouseDown'
  import onMouseUp from './methods/onMouseUp'
  import onMouseMove from './methods/onMouseMove'
  import onMouseWheel from './methods/onMouseWheel'
  import onMouseOver from './methods/onMouseOver'
  import onMouseOut from './methods/onMouseOut'
  import onDragEnter from './methods/onDragEnter'
  import onDragLeave from './methods/onDragLeave'
  import onDragOver from './methods/onDragOver'
  import onDrop from './methods/onDrop'
  import calcScale from './methods/calcScale'
  import moveCamera from './methods/moveCamera'
  import zoomCamera from './methods/zoomCamera'
  import createDesignFromId from './methods/createDesignFromId'
  import createActorFromDesign from './methods/createActorFromDesign'
  import createPreviewActor from './methods/createPreviewActor'
  import removePreviewActor from './methods/removePreviewActor'
  import transformPreviewActor from './methods/transformPreviewActor'
  import cancelPreviewActor from './methods/cancelPreviewActor'
  import createActor from './methods/createActor'


  export default {

    props: ['data'],
    data: () => ({
      path: null,
      lve: null,
      resizeObserver: null,
      canvasWidth: 0,
      canvasHeight: 0,
      cameraPersp: 0,
      cameraDefaultPersp: 100,
      isMouseLeftDown: false,
      isMouseWheelDown: false,
      isMouseRightDown: false,
      actorDesign: null,
      actorDesignStyle: {},
      actorPreviewStyle: {},
    }),

    methods: {
      setCanvasResize,
      initFrame,
      destroyFrame,
      setResizeObserver,
      destroyObserver,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseWheel,
      onMouseOver,
      onMouseOut,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      calcScale,
      moveCamera,
      zoomCamera,
      createDesignFromId,
      createActorFromDesign,
      createPreviewActor,
      removePreviewActor,
      transformPreviewActor,
      cancelPreviewActor,
      createActor,
    },

    created() {
      this.path = this.data.directory
    },

    mounted() {
      this.setCanvasResize()
      this.setResizeObserver()
      this.initFrame()
    },

    beforeDestroy() {
      this.destroyFrame()
      this.destroyObserver()
    },

  }
</script>

<style lang="scss" scoped>
  .actor-viewer {
    width: 100%;
    height: 100%;
  }
</style>