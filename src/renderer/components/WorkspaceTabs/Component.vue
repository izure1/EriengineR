<template>
  <section class="workspace-tabs" @dragover.self="allowDropTab" @drop.self="dropTab(null)">
    <div v-for="[id, tab] in tabs.entries()" :key="id" :class="tab.selected ? 'workspace-tabs-selected' : ''" draggable="true"
      @dragstart="startDragTab(id)" @dragover="allowDropTab" @drop="dropTab(id)">
      <a href="#" v-on="on">
        <p @mousedown="tabClick(id)">{{ tab.name }}</p>
        <span @click.stop="tabClose(id)">⨉</span>
        <hr v-if="!tab.selected">
      </a>
      <span v-if="tab.selected" class="workspace-tabs-smoothes left"></span>
      <span v-if="tab.selected" class="workspace-tabs-smoothes right"></span>
    </div>
  </section>
</template>

<script>
  import fs from 'fs'

  import createUUID from '@common/js/createUUID'
  import {
    VueMap
  } from '@common/js/VueIterator'
  import WorkspaceTab from './js/WorkspaceTab'

  export default {

    data: () => ({
      // Workspace에 열려있는 탭의 목록을 관리하는 배열입니다.
      tabs: new VueMap, // Vue 2.x 버전에서 Map, Set 객체의 반응성을 감지하지 않는 문제를 해결하기 위한 객체
      lastClickedTab: null,
      draggingTab: null,
    }),

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

        this.tabs.set(id, new WorkspaceTab(name, events))
        this.$root.$emit('create-workspace-content', id, template)

        this.tabClick(id)

      },

      tabClick(id) {

        if (!this.tabs.has(id)) {
          return
        }

        this.tabs.forEach(t => t.selected = false)
        this.lastClickedTab = id

        let tab

        tab = this.tabs.get(id)
        tab.selected = true

        if (tab.onclick && tab.onclick.call) {
          tab.onclick()
        }

        this.$root.$emit('show-workspace-content', id)

      },

      tabClose(id) {

        if (!this.tabs.has(id)) {
          return
        }

        let tab = this.tabs.get(id)

        this.tabs.delete(id)

        this.$root.$emit('close-workspace-content', id, tab.onclose)

        if (id === this.lastClickedTab) {
          this.lastClickedTab = null
        }

        if (this.tabs.size) {

          let first

          first = this.tabs.keys()
          first = Array.from(first).pop()

          this.tabClick(this.lastClickedTab || first)

        }

      },

      startDragTab(id) {
        this.draggingTab = id
      },

      allowDropTab(e) {
        e.preventDefault()
      },

      dropTab(id) {

        let dropped
        let current

        dropped = this.draggingTab
        current = id

        if (dropped === current) {
          return
        }

        let ids = Array.from(this.tabs.keys())

        dropped = ids.indexOf(dropped)
        current = ids.indexOf(current)

        tab = ids.splice(dropped, 1)
        tab = tab[0]

        if (current === -1) {
          current = ids.length
        }

        ids.splice(current, 0, tab)

        this.sortTabsFromIds(ids)

      },

      sortTabsFromIds(ids) {

        let tabs

        tabs = ids.map(id => this.tabs.get(id))
        tabs = tabs.filter(tab => !!tab)

        return this.tabs = tabs

      }

    },

    created() {

      this.$set(this.tabs)

      this.$root.$on('create-workspace', (id, name, template = 'DEFAULT', events = {}) => {
        this.createTab(id, name, template, events)
      })

      this.$root.$on('close-workspace', id => {
        this.tabClose(id)
      })

    }
  }
</script>

<style lang="scss" scoped>
  $barBackgroundColor: #555;
  $tabBackgroundColor: #333;

  .workspace-tabs {
    width: 100%;
    height: 33px;
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    list-style: none;
    position: relative;
    z-index: 0;
    background-color: $barBackgroundColor;

    >div {
      max-width: 200px;
      height: 100%;
      position: relative;
      box-sizing: border-box;
      flex: 1 1 auto;

      &.workspace-tabs-selected {
        background-color: $tabBackgroundColor;
        z-index: 1;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      >.workspace-tabs-smoothes {
        width: 10px;
        height: 10px;
        display: block;
        position: absolute;
        overflow: hidden;
        background-color: $tabBackgroundColor;
        z-index: 1;

        &::after {
          content: '';
          width: 10px;
          height: 10px;
          display: block;
          background-color: $barBackgroundColor;
        }

        &.left::after {
          border-bottom-right-radius: 10px;
        }

        &.right::after {
          border-bottom-left-radius: 10px;
        }

        &.left {
          left: -10px;
          top: 23px;
        }

        &.right {
          right: -10px;
          top: 23px;
        }
      }

      >a {
        height: 100%;
        line-height: 33px;
        color: inherit;
        text-decoration: none;
        padding: 0 10px;
        display: flex;
        position: relative;

        >p,
        >span {
          padding: 0;
          margin: 0;
          display: inline-block;
          vertical-align: top;
        }

        >p {
          font-size: 9pt;
          font-family: 'NanumGothic';
          line-height: 33px;
          flex: 1 1 auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        >span {
          margin-left: 10px;
          flex: 0 0 auto;
        }

        >hr {
          width: 1px;
          height: 60%;
          border: 0;
          margin: 0;
          background-color: rgba(255, 255, 255, .2);
          position: absolute;
          right: -1px;
          top: 20%;
        }
      }
    }
  }
</style>