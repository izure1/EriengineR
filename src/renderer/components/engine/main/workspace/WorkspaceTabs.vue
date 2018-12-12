<template>
  <ul class="workspace-tabs" @dragover.self="allowDropTab" @drop.self="dropTab(null)">
    <li v-for="item in tabs" :key="item.id" :class="item.selected === true ? 'workspace-tabs-selected' : ''" draggable="true"
      @dragstart="startDragTab(item)" @dragover="allowDropTab" @drop="dropTab(item)">
      <a href="#">
        <p @mousedown="tabMousedown(item)">{{ item.name }}</p>
        <span @click="tabClose(item)">⨉</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import fs from 'fs'

  import createUUID from '@static/js/createUUID'
  import WorkspaceTab from './js/WorkspaceTab'

  export default {
    data() {
      return {
        // Workspace에 열려있는 탭의 목록을 관리하는 배열입니다.
        tabs: [],
        draggingTab: null
      }
    },
    methods: {
      /**
       * @description Workspace에서 새로운 탭을 열도록 도와줍니다.
       * 
       * @param {String} id 새로운 탭의 유일무이한 고유값입니다. 이것을 지정하지 않으면 getWorkspaceTab 이벤트 발생으로 원하는 탭을 찾을 수 없습니다
       * @param {String} name 새로운 탭의 이름을 설정합니다.
       * @param {String} template 새로운 탭의 기본 템플릿을 지정합니다
       * @param {Object} events 새로운 탭의 이벤트핸들러 함수가 담겨있습니다
       */
      createTab(id, name, template, events) {

        let tab

        tab = this.tabs.filter(t => t.id === id)
        tab = tab[0]

        // 이미 같은 id 값을 가진 탭이 존재할 경우 생성하지 않습니다
        if (!tab) {

          tab = new WorkspaceTab(id, name, events)

          this.tabs.push(tab)
          this.$root.$emit('createWorkspaceTab-content', id, template)

        }

        this.tabMousedown(tab)

      },
      tabMousedown(item) {

        this.tabs.forEach(t => t.selected = false)
        item.selected = true

        if (item.onclick && item.onclick.call) {
          item.onclick()
        }

        this.$root.$emit('showWorkspaceTab-content', item.id)

      },
      tabClose(item) {

        let i
        let t

        i = this.tabs.length

        while (i--) {

          t = this.tabs[i]

          if (t.id !== item.id) continue
          if (t.onclose && t.onclose.call) {
            t.onclose()
          }

          this.tabs.splice(i, 1)
          this.$root.$emit('closeWorkspaceTab-content', item.id)
          break

        }

        if (this.tabs.length) {
          this.tabMousedown(this.tabs[0])
        }

      },

      startDragTab(tab) {
        this.draggingTab = tab
      },

      allowDropTab(e) {
        e.preventDefault()
      },

      dropTab(tab) {

        let dropped
        let current

        dropped = this.draggingTab
        current = tab

        if (dropped === current) {
          return
        }

        dropped = this.tabs.indexOf(dropped)
        current = this.tabs.indexOf(current)

        tab = this.tabs.splice(dropped, 1)
        tab = tab[0]

        if (current === -1) {
          current = this.tabs.length
        }

        this.tabs.splice(current, 0, tab)

      }
    },
    mounted() {

      this.$root.$on('createWorkspaceTab', (id, name, template = 'DEFAULT', events = {}) => {
        this.createTab(id, name, template, events)
      })

    }
  }
</script>

<style lang="scss" scoped>
  ul,
  li {
    padding: 0;
    margin: 0;
  }

  .workspace-tabs {
    width: 100%;
    height: 33px;
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    list-style: none;
    position: relative;
    z-index: 0;
    background-color: #d9d9d9;

    >li {
      max-width: 200px;
      height: 100%;
      box-sizing: border-box;
      flex: 1 1 auto;
      background-color: #d9d9d9;
      border-right: 1px solid #e7e7e7;

      &.workspace-tabs-selected {
        background-color: #e7e7e7;
      }

      >a {
        height: 100%;
        color: black;
        line-height: 33px;
        text-decoration: none;
        padding: 0 10px;
        display: flex;

        >p,
        >span {
          padding: 0;
          margin: 0;
          display: inline-block;
          vertical-align: top;
        }

        >p {
          font-size: smaller;
          flex: 1 1 auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        >span {
          margin-left: 10px;
          flex: 0 0 auto;
        }
      }
    }
  }
</style>