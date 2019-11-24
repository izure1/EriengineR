<template>
  <section id="terminal">
    <section class="terminal-header">
      <a v-for="(tab, key) in tabs" href="#" @click.self="selectTab($event, tab)" :key="key" :data-inputable="tab.useInput"
        :data-unique="key">{{ tab.title }} <span :class="'terminal-alertor terminal-alertor-' + key" v-if="tab.count">{{
          tab.count }}</span></a>
    </section>
    <section class="terminal-container" @click="focusInput">
      <article v-for="(tab, key) in tabs" :key="key" v-show="currentTab === key">
        <dl v-for="(content, index) in tab.contents" :key="index">
          <dt>When</dt>
          <dd>{{ content.timestamp }}</dd>
          <dt>Where</dt>
          <dd>{{ content.user }}</dd>
          <dt>What</dt>
          <dd>{{ content.message }}</dd>
          <dt>Why</dt>
          <dd>{{ content.stack }}</dd>
        </dl>
      </article>
    </section>
    <section class="terminal-footer">
      <input @keydown.enter="inputCommand" placeholder="명령어를 입력하세요" v-if="inputable" @keydown.up="goCommandHistory($event, -1)"
        @keydown.down="goCommandHistory($event, 1)">
    </section>
  </section>
</template>

<script>
  import {
    ipcRenderer
  } from 'electron'

  import TABS from './vars/TABS'

  import setErrorReceiver from './js/setErrorReceiver'
  import setOutputReceiver from './js/setOutputReceiver'

  export default {
    data: () => ({
      tabs: new TABS(),
      currentTab: null,
      inputable: false,
      command: {
        index: -1,
        history: []
      }
    }),
    methods: {

      selectTab(e, tab) {

        let parent
        let inputable
        let currentTab

        parent = e.target.parentElement
        inputable = e.target.dataset.inputable
        currentTab = e.target.dataset.unique

        for (let node of parent.children) {
          node.classList.remove('select')
        }

        e.target.classList.add('select')
        tab.count = 0

        this.inputable = inputable
        this.currentTab = currentTab

      },

      inputCommand(e) {

        let out
        let command

        command = e.currentTarget.value
        out = {
          message: null,
          stack: null
        }

        if (!command) {
          return
        }

        try {

          out.message = eval(`(${command})`)
          out.message = JSON.stringify(out.message)
          out.stack = command

          ipcRenderer.send('send-output', out)

        } catch (e) {

          throw e

        } finally {

          e.currentTarget.value = ''

          this.command.history.push(command)

          if (this.command.history.length > 200) {
            this.command.history.shift()
          }

          this.command.index = this.command.history.length - 1

        }

      },

      goCommandHistory(e, i) {

        let max
        let min

        max = this.command.history.length - 1
        min = -1

        this.command.index += i

        if (this.command.index > max) {
          this.command.index = max
        }

        if (this.command.index < min) {
          this.command.index = min
        }

        if (this.command.index === -1) {
          return
        }

        e.currentTarget.value = this.command.history[this.command.index]

      },

      focusInput() {

        if (!this.inputable) {
          return
        }

        this.$el.querySelector('input:not(readonly)').focus()

      }

    },

    mounted() {
      setErrorReceiver(this.tabs.error)
      setOutputReceiver(this.tabs.output)
    }

  }
</script>

<style lang="scss" scoped>
  #terminal {

    background-color: #303030;
    border-top: 1px solid gray;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;

    .terminal-header {
      height: 30px;
      line-height: 30px;
      flex: 0 0 30px;

      a {
        height: 100%;
        font-size: smaller;
        font-weight: bold;
        color: gray;
        text-decoration: none;
        display: inline-block;
        padding: 0 20px;

        .terminal-alertor {
          width: 15px;
          height: 15px;
          line-height: 15px;
          font-size: smaller;
          font-weight: bold;
          color: white;
          background-color: gray;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          border-radius: 100px;
        }

        &.select {
          color: lightgray;
          border-bottom: 1px solid gray;
        }
      }
    }

    .terminal-container {
      flex: 1 1 auto;
      overflow-y: scroll;

      article {
        font-size: small;
        font-family: consolas;
        font-weight: bold;
        padding: 20px;

        >dl {
          margin: 10px 0;
          border-bottom: 1px dashed gray;
          user-select: all;

          >* {
            user-select: text;
          }

          >dt {
            color: orange;
          }

          >dd {
            color: lightgray !important;
            margin: 5px 0 20px;
          }
        }
      }
    }

    .terminal-footer {
      height: 30px;
      flex: 0 0 30px;

      input {
        width: 100%;
        height: 100%;
        font-family: consolas;
        color: gray;
        background-color: transparent;
        border: 0;
        outline: none;
        padding: 0 20px;
        box-sizing: border-box;
      }
    }

  }
</style>