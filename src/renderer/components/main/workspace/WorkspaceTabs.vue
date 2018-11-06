<template>
  <ul class="workspace-tabs">
    <li v-for="(item, index) in tabs" :key="index" :class="item.selected === true ? 'workspace-tabs-selected' : ''">
      <a href="#">
        <p @mousedown="tabMousedown(item)">{{ item.name }}</p>
        <span @click="tabClose(item)">✖</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import createUUID from '@/js/createUUID'
  import WorkspaceTab from './js/WorkspaceTab'

  export default {
    data() {
      return {
        // Workspace에 열려있는 탭의 목록을 관리하는 배열입니다.
        tabs: []
      }
    },
    methods: {
      /**
       * @description Workspace에서 새로운 탭을 열도록 도와줍니다.
       * 
       * @param {String} name 새로운 탭의 이름을 설정합니다.
       * @param {String} ud 새로운 탭의 유일무이한 고유값입니다. 이것을 지정하지 않으면 getWorkspaceTab 이벤트 발생으로 원하는 탭을 찾을 수 없습니다
       * @param {Object} events 새로운 탭의 이벤트핸들러 함수가 담겨있습니다
       */
      createTab(name, id, events) {

        this.tabs.push(new WorkspaceTab(id, name, events))

        this.$root.$emit('createWorkspaceTab-content', id)
        this.$root.$emit('getWorkspaceTab', id, events.oncreate)

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

      }
    },
    mounted() {

      this.$root.$on('createWorkspaceTab', (name, events = {}, id = createUUID()) => {
        this.createTab(name, id, events)
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