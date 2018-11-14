<template>
  <div v-dragscroll:nochilddrag class="template-script">
    <span class="template-script-eof"></span>
    <section class="script-box" v-for="(script, index) in data" :key="index">
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
  import {
    Script,
    ScriptContext
  } from './js/Script'

  import {
    dragscroll
  } from 'vue-dragscroll'

  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/draggable'

  export default {
    props: ['data'],
    directives: {
      dragscroll
    },
    methods: {
      setDefaultViewPosition() {
        let width
        let height
        let eof

        eof = this.$el.querySelector('.template-script-eof')
        eof = eof.offsetParent

        this.$el.scrollTop = 500000
        this.$el.scrollLeft = 500000
      },
      setDraggableBox() {

        $('.script-box', this.$el).draggable({
          cursor: 'move',
          handle: '.script-box-header',
          grid: [20, 20]
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

      }
    },
    mounted() {
      
      this.setDefaultViewPosition()
      this.setDraggableBox()

    },
    updated() {
      this.setDraggableBox()
    }
  }
</script>

<style lang="scss" scoped>
  $maxPerspective: 600px;
  $maxXAxis: 1000000px;
  $maxYAxis: 1000000px;

  .template-script {
    height: 100%;
    position: relative;
    overflow: hidden;
    perspective: $maxPerspective;

    &:active {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }

    >.template-script-eof {
      width: 1px;
      height: 1px;
      position: absolute;
      left: $maxXAxis;
      top: $maxYAxis;
      visibility: hidden;
    }
  }

  .script-box {
    width: 420px;
    position: absolute;
    left: 100px;
    top: 100px;
    background-color: white;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .15);
    //transform: translateZ(-300px);

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
        color: gray;
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