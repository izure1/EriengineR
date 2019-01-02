<template>
  <div v-dragscroll:nochilddrag class="template-scriptviewer">
    <span class="template-scriptviewer-eof"></span>
    <div class="template-scriptviewer-axis">
      <div v-for="x in pos.x" :key="`pos_${x}`" :style="{left: `${x}px`}">
        <div v-for="y in pos.y" :key="`pos_${y}`" :style="{top: `${y}px`}">
          <span :style="{left: `${x}px`, top: `${y}px`}">{{ x }}, {{ y }}</span>
        </div>
      </div>
    </div>
    <section :id="getScriptId(script)" class="script-box" v-for="script in getScriptData" :key="script.id" :style="{left: getScriptBoxPosition(script.position.x), top: getScriptBoxPosition(script.position.y)}">
      <div class="script-box-header">
        <span>{{ script.id }}</span>
        <a href="#" @click="dropScript(script)">⨉</a>
      </div>
      <div class="script-box-container" @dblclick="modifyScript(script)">
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
  import glob from 'glob'
  import path from 'path'

  import {
    Script,
    ScriptContext
  } from './js/Script'

  import {
    ipcRenderer
  } from 'electron'

  import {
    dragscroll
  } from 'vue-dragscroll'

  import $ from 'jQuery'
  import {
    jsPlumb
  } from 'jsplumb'


  export default {
    props: ['data'],
    data() {
      return {
        jsPlumb: jsPlumb.getInstance(),
        pos: {
          grid: 1000,
          max: 50000,
          x: [],
          y: []
        }
      }
    },
    directives: {
      dragscroll
    },
    computed: {

      getScriptData() {

        let scripts
        let failed

        scripts = glob.sync('*.esscript', {
          cwd: this.data,
          nodir: true
        })

        // 데이터로 받은 스크립트 파일 경로로부터 스크립트 목록을 만듭니다
        scripts = scripts.map(filename => {

          let filepath
          let filedata

          try {

            filepath = path.join(this.data, filename)
            filedata = fs.readJSONSync(filepath)

            Object.defineProperty(filedata, 'path', {
              value: filepath
            })

          } catch (e) {
            failed = e.toString()
            return
          }

          return filedata

        })

        // 스크립트 파일이 없거나 문제가 있을 때 에러를 발생하고 작업을 중지합니다
        if (failed) {

          ipcRenderer.send('send-error', {
            user: 'Script',
            content: failed
          })

          return

        }

        return scripts

      }

    },
    methods: {

      getScriptId(script) {
        return `jsplumb_script-box-${script.id}`
      },

      getScriptBoxPosition(pos = 200) {
        return `${pos}px`
      },

      setDraggableBox() {

        let ids = this.getScriptData.map(script => this.getScriptId(script))

        this.jsPlumb.reset()
        this.jsPlumb.ready(() => {

          this.jsPlumb.connect({
            source: ids[0],
            target: ids[1],
            endpoint: 'Blank',
            overlays: [
              ['Arrow', {
                id: 'arrow',
                location: 1
              }]
            ]
          })

          this.jsPlumb.draggable(ids, {
            grid: [20, 20]
          })

        })

      },

      dropScript(script) {

        let isDrop
        let i

        isDrop = confirm('정말로 이 스크립트를 삭제합니까?')
        i = this.data.length

        if (!isDrop) {
          return
        }

        while (i--) {

          if (this.data[i] !== script) {
            continue
          }

          this.data.splice(i, 1)
          break

        }

      },

      modifyScript(script) {
        this.$root.$emit('createWorkspaceTab', script.id, script.id, 'SCRIPT-EDITOR', {})
        this.$root.$emit('setDataForWorkspaceTab', script.id, script)
      },

      setAxisAlertor() {

        for (let i = 0; i < this.pos.max; i += this.pos.grid) {
          this.pos.x.push(i)
          this.pos.y.push(i)
        }

      }

    },
    created() {
      this.setAxisAlertor()
    },
    mounted() {
      this.setDraggableBox()
    },
    updated() {
      this.setDraggableBox()
    }
  }
</script>

<style lang="scss" scoped>
  $maxPerspective: 600px;
  $maxXAxis: 50000px;
  $maxYAxis: 50000px;

  .template-scriptviewer {
    height: 100%;
    position: relative;
    overflow: hidden;
    perspective: $maxPerspective;

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
    left: 200px;
    top: 200px;
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .15);

    &.ui-draggable-dragging {
      z-index: 1;
    }

    .script-box-header {
      height: 25px;
      background-color: #ccc;
      padding: 0 5px;
      box-sizing: border-box;
      clear: both;
      cursor: move;

      >span {
        font-size: small;
        color: black;
        line-height: 25px;
        float: left;
      }

      >a {
        color: white;
        line-height: 25px;
        text-decoration: none;
        display: block;
        float: right;
        padding: 2px 4px;

        &:hover {
          color: gray;
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
          color: #0075c8;
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