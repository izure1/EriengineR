<template>
  <div v-dragscroll:nochilddrag class="template-scriptviewer" @contextmenu.self="createScript"
    @mousemove="setCursorInformation" @mousewheel="setZAxis"
    :style="{width: `${100 / persp.value}%`, height: `${100 / persp.value}%`, transform:`scale(${persp.value})`}">
    <span :id="getCursorPointerId" class="template-scriptviewer-cursor" v-show="connection.source"
      :style="{ left: `${connection.x}px`, top: `${connection.y}px` }"></span>
    <div class="template-scriptviewer-axis">
      <div v-for="x in pos.x" :key="`pos_${x}`" :style="{left: `${x}px`}">
        <div v-for="y in pos.y" :key="`pos_${y}`" :style="{top: `${y}px`}">
          <span :style="{left: `${x}px`, top: `${y}px`}">{{ x }}, {{ y }}</span>
        </div>
      </div>
    </div>
    <section v-for="script in scripts" :key="script.id" :id="getScriptId(script.id)" :data-id="script.id"
      class="script-box"
      :class="{dropping: (connection.target === script && connection.source)}"
      @mouseenter="connection.target = script" @mouseleave="connection.target = null"
      :style="{left: `${script.position.x}px`, top: `${script.position.y}px`}">
      <div class="script-box-header">
        <div class="script-header-title">
          <span>{{ getScriptTitle(script.path) }}</span>
        </div>
        <div class="script-header-job" v-if="!connection.source">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon small @click="createConnection(script)" v-on="on">
                <v-icon small>link</v-icon>
              </v-btn>
            </template>
            <span>스크립트 연결</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon small @click="copyScript(script.path)" v-on="on">
                <v-icon small>file_copy</v-icon>
              </v-btn>
            </template>
            <span>스크립트 복사</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon small @click="dropScript(script)" v-on="on">
                <v-icon small>delete_forever</v-icon>
              </v-btn>
            </template>
            <span>스크립트 삭제</span>
          </v-tooltip>
        </div>
      </div>
      <div class="script-box-comment ma-2 mt-3 caption">
        <span class="orange--text" v-html="parseCommentToHTML(script.comment)"></span>
      </div>
      <div class="script-box-container ma-2" @dblclick="modifyScript(script)" @click="createConnectionDone(script)">
        <div>
          <h6>사건</h6>
          <ul v-if="script.events.length">
            <li v-for="(event, index) in script.events" :key="index" class="script-box-text">
              {{ getMacroDescription(event) }}
            </li>
          </ul>
          <p v-else class="script-box-text">비어있음</p>
        </div>
        <div>
          <h6>조건</h6>
          <ul v-if="script.conditions.length">
            <li v-for="(condition, index) in script.conditions" :key="index" class="script-box-text">
              {{ getMacroDescription(condition) }}
            </li>
          </ul>
          <p v-else class="script-box-text">비어있음</p>
        </div>
        <div>
          <h6>행동</h6>
          <ul v-if="script.actions.length">
            <li v-for="(action, index) in script.actions" :key="index" class="script-box-text">
              {{ getMacroDescription(action) }}
            </li>
          </ul>
          <p v-else class="script-box-text">비어있음</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {
    dragscroll
  } from 'vue-dragscroll'
  import {
    jsPlumb
  } from 'jsplumb'

  import createUUID from '@common/js/createUUID'


  // Methods
  import cancelConnecting from './methods/ScriptViewer/cancelConnecting'
  import createConnection from './methods/ScriptViewer/createConnection'
  import deleteConnection from './methods/ScriptViewer/deleteConnection'
  import createConnectionDone from './methods/ScriptViewer/createConnectionDone'
  import createScript from './methods/ScriptViewer/createScript'
  import copyScript from './methods/ScriptViewer/copyScript'
  import dropScript from './methods/ScriptViewer/dropScript'
  import focusScript from './methods/ScriptViewer/focusScript'
  import getScriptId from './methods/ScriptViewer/getScriptId'
  import getScriptData from './methods/ScriptViewer/getScriptData'
  import getOriginScript from './methods/ScriptViewer/getOriginScript'
  import getScriptTitle from './methods/ScriptViewer/getScriptTitle'
  import getMacroDescription from './methods/ScriptViewer/getMacroDescription'
  import modifyScript from './methods/ScriptViewer/modifyScript'
  import saveScript from './methods/ScriptViewer/saveScript'
  import setAxisAlertor from './methods/ScriptViewer/setAxisAlertor'
  import setConnectBox from './methods/ScriptViewer/setConnectBox'
  import setCursorInformation from './methods/ScriptViewer/setCursorInformation'
  import setDraggableBox from './methods/ScriptViewer/setDraggableBox'
  import setJsPlumbBox from './methods/ScriptViewer/setJsPlumbBox'
  import setZAxis from './methods/ScriptViewer/setZAxis'
  import watchDirectory from './methods/ScriptViewer/watchDirectory'
  import parseCommentToHTML from './methods/ScriptViewer/parseCommentToHTML'
  import isUnrunable from './methods/ScriptViewer/isUnrunable'


  export default {
    props: ['data'],
    data: () => ({
      watcher: null,
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
      getMacroDescription,
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
      copyScript,
      dropScript,
      focusScript,
      modifyScript,
      createScript,
      saveScript,
      setAxisAlertor,
      parseCommentToHTML,
      isUnrunable,
    },
    created() {
      this.setAxisAlertor()
      this.watchDirectory()
    },
    mounted() {
      this.setJsPlumbBox()
    },
    destroyed() {
      this.watcher.close()
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
    overflow: hidden;
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #252525;
    box-shadow: 0px 0px 3px black;

    &.ui-draggable-dragging {
      z-index: 1;
    }

    &.dropping {
      border: 2px solid red;
    }

    &.unrunable {
      opacity: 0.3;
    }

    .script-box-header {
      height: 30px;
      background-color: #333;
      border-radius: 5px;
      padding: 0 8px;
      box-sizing: border-box;
      cursor: move;

      display: flex;
      flex-direction: row;

      span {
        max-width: 320px;
        font-size: small;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      >div {
        display: flex;
        flex: 1 1 auto;
      }
    }

    .script-header-job {
      max-width: 85px;
    }

    .script-box-comment {
      line-height: 1.4;
    }

    .script-box-container {
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
          margin: 0;
          list-style: none;
        }

        .script-box-text {
          font-size: small;
          color: gray;
          letter-spacing: -1px;
          word-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>