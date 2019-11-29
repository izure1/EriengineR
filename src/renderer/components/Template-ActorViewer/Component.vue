<template>
  <section class="actor-viewer">
    <section class="actor-canvas" :style="{ width: getCanvasWidth, height: getCanvasHeight }">
      <canvas :width="canvasWidth" :height="canvasHeight" @mousedown="onMouseDown" @mouseup="onMouseUp"
        @mousemove="onMouseMove" @mousewheel="onMouseWheel" @mouseover="onMouseOver" @mouseout="onMouseOut"></canvas>
    </section>
    <section class="actor-editor"
      :style="{ width: getActorComponentWidth, right: (isExistsActor ? 0 : `-${getActorComponentWidth}`) }">
      <template-actor-editor :data="actorPath"></template-actor-editor>
    </section>
  </section>
</template>

<script>
  import TemplateActorEditor from '@/components/Template-ActorEditor/Component'

  import Draggable from '@/assets/js/Draggable'

  import getCanvasWidth from './computed/getCanvasWidth'
  import getCanvasHeight from './computed/getCanvasHeight'
  import getActorComponentWidth from './computed/getActorComponentWidth'
  import isExistsActor from './computed/isExistsActor'

  import setCanvasResize from './methods/setCanvasResize'
  import setDragEvent from './methods/setDragEvent'
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
  import createActorFile from './methods/createActorFile'


  export default {

    components: {
      TemplateActorEditor,
    },

    props: ['data'],
    data: () => ({

      path: null,
      lve: null,
      resizeObserver: null,
      draggable: new Draggable,
      canvasWidth: 0,
      canvasHeight: 0,
      cameraPersp: 0,
      cameraDefaultPersp: 100,
      isMouseLeftDown: false,
      isMouseWheelDown: false,
      isMouseRightDown: false,
      ghostActorStyle: {},

      actorPath: null,
      actorComponentWidth: 350,
      
    }),

    computed: {
      getCanvasWidth,
      getCanvasHeight,
      getActorComponentWidth,
      isExistsActor,
    },

    methods: {
      setCanvasResize,
      setDragEvent,
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
      createActorFile,
    },

    created() {
      this.path = this.data.directory
    },

    mounted() {
      this.setCanvasResize()
      this.setResizeObserver()
      this.initFrame()
      this.setDragEvent()
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
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .actor-canvas {
    flex: 1 1 auto;
  }

  .actor-editor {
    height: 100%;
    position: absolute;
    background-color: #333;
    padding: 10px;
    right: 0;
    top: 0;
    flex: 0 0 auto;
    overflow: auto;
    overflow-y: scroll;
    transition: right 0.3s ease-out;
  }
</style>