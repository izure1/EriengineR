<template>
  <div v-dragscroll:nochilddrag class="template-scriptviewer" @contextmenu.self="createScript" @mousemove="setCursorInformation"
    @mousewheel="setZAxis" :style="{width: `${100 / persp.value}%`, height: `${100 / persp.value}%`, transform:`scale(${persp.value})`}">
    <span class="template-scriptviewer-eof"></span>
    <span :id="getCursorPointerId" class="template-scriptviewer-cursor" v-show="connection.source" :style="{ left: `${connection.x}px`, top: `${connection.y}px` }"></span>
    <div class="template-scriptviewer-axis">
      <div v-for="x in pos.x" :key="`pos_${x}`" :style="{left: `${x}px`}">
        <div v-for="y in pos.y" :key="`pos_${y}`" :style="{top: `${y}px`}">
          <span :style="{left: `${x}px`, top: `${y}px`}">{{ x }}, {{ y }}</span>
        </div>
      </div>
    </div>
    <section v-for="script in scripts" :key="script.id" :id="getScriptId(script.id)" :data-id="script.id" class="script-box"
      :class="{isdropping: (connection.target === script && connection.source)}" @mouseenter="connection.target = script"
      @mouseleave="connection.target = null" :style="{left: `${script.position.x}px`, top: `${script.position.y}px`}">
      <div class="script-box-header">
        <span>{{ getScriptTitle(script.path) }}</span>
        <a href="#" title="스크립트 삭제" @click="dropScript(script)" v-if="!connection.source">
          <v-icon>delete_forever</v-icon>
        </a>
        <a href="#" title="스크립트 연결" @click="createConnection(script)" v-if="!connection.source">
          <v-icon>link</v-icon>
        </a>
      </div>
      <div class="script-box-container" @dblclick="modifyScript(script)" @click="createConnectionDone(script)">
        <div>
          <h6>사건</h6>
          <ul>
            <li v-for="(event, index) in script.events" :key="index">{{ event.text }}</li>
          </ul>
        </div>
        <div>
          <h6>조건</h6>
          <ul>
            <li v-for="(condition, index) in script.conditions" :key="index">{{ condition.text }}</li>
          </ul>
        </div>
        <div>
          <h6>행동</h6>
          <ul>
            <li v-for="(action, index) in script.actions" :key="index">{{ action.text }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import electron from 'electron'

  import {
    dragscroll
  } from 'vue-dragscroll'

  import {
    jsPlumb
  } from 'jsplumb'

  import createUUID from '@static/js/createUUID'


  // Methods
  import cancelConnecting from './methods/ScriptViewer/cancelConnecting'
  import createConnection from './methods/ScriptViewer/createConnection'
  import deleteConnection from './methods/ScriptViewer/deleteConnection'
  import createConnectionDone from './methods/ScriptViewer/createConnectionDone'
  import createScript from './methods/ScriptViewer/createScript'
  import dropScript from './methods/ScriptViewer/dropScript'
  import focusScript from './methods/ScriptViewer/focusScript'
  import getScriptId from './methods/ScriptViewer/getScriptId'
  import getScriptData from './methods/ScriptViewer/getScriptData'
  import getOriginScript from './methods/ScriptViewer/getOriginScript'
  import getScriptTitle from './methods/ScriptViewer/getScriptTitle'
  import modifyScript from './methods/ScriptViewer/modifyScript'
  import saveScript from './methods/ScriptViewer/saveScript'
  import setAxisAlertor from './methods/ScriptViewer/setAxisAlertor'
  import setConnectBox from './methods/ScriptViewer/setConnectBox'
  import setCursorInformation from './methods/ScriptViewer/setCursorInformation'
  import setDraggableBox from './methods/ScriptViewer/setDraggableBox'
  import setJsPlumbBox from './methods/ScriptViewer/setJsPlumbBox'
  import setZAxis from './methods/ScriptViewer/setZAxis'
  import watchDirectory from './methods/ScriptViewer/watchDirectory'


  export default {
    props: ['data'],
    data: () => ({
      uuid: createUUID(),
      jsPlumb: jsPlumb.getInstance(),
      scripts: [],
      pos: {
        grid: 1000,
        max: 15000,
        x: [],
        y: []
      },
      persp: {
        value: 1,
        max: 1,
        min: 0.3
      },
      connection: {
        x: 0,
        y: 0,
        source: null,
        target: null
      }
    }),
    directives: {
      dragscroll
    },
    computed: {
      getCursorPointerId() {
        return `template-scriptviewer-cursor-${this.uuid}`
      }
    },
    methods: {
      watchDirectory,
      getScriptData,
      getOriginScript,
      getScriptTitle,
      getScriptId,
      setCursorInformation,
      setConnectBox,
      setZAxis,
      setDraggableBox,
      setJsPlumbBox,
      createConnection,
      cancelConnecting,
      deleteConnection,
      createConnectionDone,
      dropScript,
      focusScript,
      modifyScript,
      createScript,
      saveScript,
      setAxisAlertor,
    },
    created() {
      this.setAxisAlertor()
      this.watchDirectory()
    },
    mounted() {
      this.setJsPlumbBox()
    },
    watch: {
      'data.script': function () {
        this.scripts = this.getScriptData(this.data.directory)
        this.focusScript(this.data.script)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $maxPerspective: 600px;
  $maxXAxis: 50000px;
  $maxYAxis: 50000px;

  .template-scriptviewer {
    position: absolute;
    overflow: hidden;
    perspective: $maxPerspective;
    transform: scale(1);
    transform-origin: left top;
    z-index: 1;

    &:active {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }

    >.template-scriptviewer-eof {
      width: 1px;
      height: 1px;
      position: absolute;
      left: $maxXAxis;
      top: $maxYAxis;
      visibility: hidden;
    }

    >.template-scriptviewer-cursor {
      width: 1px;
      height: 1px;
      position: fixed;
      pointer-events: none;
      z-index: 1;
      visibility: hidden;
    }

    >.template-scriptviewer-axis {
      width: 100%;
      height: 100%;
      pointer-events: none;

      div {
        position: absolute;
      }

      span {
        font-size: x-small;
        color: gray;
        white-space: nowrap;
      }
    }
  }

  .script-box {
    width: 420px;
    position: absolute;
    border: 2px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    background-color: #252525;
    box-shadow: 0px 0px 3px black;

    &.ui-draggable-dragging {
      z-index: 1;
    }

    &.isdropping {
      border: 2px solid red;
    }

    .script-box-header {
      height: 25px;
      background-color: #333;
      padding: 0 5px;
      box-sizing: border-box;
      clear: both;
      cursor: move;

      >span {
        font-size: small;
        line-height: 25px;
        float: left;
      }

      >a {
        color: gray;
        line-height: 25px;
        text-decoration: none;
        display: block;
        float: right;
        padding: 2px 4px;

        .v-icon {
          margin: 0;
        }
      }
    }

    .script-box-container {
      padding: 10px;
      cursor: pointer;

      >div {
        margin: 10px 0;

        h6 {
          font-size: large;
          font-weight: bold;
          margin: 0;
        }

        ul {
          padding: 0;
          margin: 10px 0;
          list-style: none;
        }
      }
    }
  }
</style>