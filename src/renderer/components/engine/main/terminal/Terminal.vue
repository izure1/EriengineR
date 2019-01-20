<template>
  <section id="terminal">
    <section class="terminal-header">
      <a v-for="(tab, index) in tabs" href="#" @click.self="selectTab" :key="index" :data-inputable="tab.useInput"
        :data-unique="tab.id">{{ tab.title }} <span :class="'terminal-alertor terminal-alertor-' + tab.id"></span></a>
    </section>
    <section class="terminal-container">
      <article v-for="(tab, index) in tabs" :key="index" v-show="currentTab === tab.id" :class="'terminal-container-' + tab.id"></article>
    </section>
    <section class="terminal-footer">
      <input @keydown="inputCommand" placeholder="명령어를 입력하세요" v-if="inputable">
      <input @keydown="inputCommand" readonly v-if="!inputable">
    </section>
  </section>
</template>

<script>
  import electron from 'electron'
  import $ from 'jquery'

  import TABS from './vars/TABS'

  import init from './js/init'
  import setErrorReceiver from './js/setErrorReceiver'
  import setOutputReceiver from './js/setOutputReceiver'

  export default {
    data() {
      return {
        tabs: new TABS(),
        currentTab: null,
        inputable: false
      }
    },
    methods: {
      selectTab(e) {
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
        e.target.querySelector('.terminal-alertor').textContent = ''

        this.inputable = inputable
        this.currentTab = currentTab
      },
      inputCommand(e) {
        let out

        out = {
          user: 'Terminal',
          content: null
        }

        if (e.keyCode !== 13) {
          return
        }

        if (!e.target.value) {
          return
        }

        try {

          out.content = eval(`(${e.target.value})`)
          out.content = JSON.stringify(out.content)

          electron.ipcRenderer.send('send-output', out)

        } catch (e) {

          out.content = e.toString()
          out.content = JSON.stringify(out.content)

          electron.ipcRenderer.send('send-error', out)

        } finally {
          e.target.value = ''
        }
      }
    },
    mounted() {
      init()
      setErrorReceiver(this.$el.querySelector('article.terminal-container-error'))
      setOutputReceiver(this.$el.querySelector('article.terminal-container-output'))
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
          font-size: smaller;
          font-weight: bold;
          color: red;
        }

        &.select {
          color: lightgray;
          border-bottom: 1px solid gray;

          .terminal-alertor {
            display: none;
          }
        }
      }
    }

    .terminal-container {
      flex: 1 1 auto;
      overflow-y: scroll;

      article {
        padding: 20px;
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
<style>
  .terminal-container-errortext,
  .terminal-container-outtext {
    font-size: small;
    font-family: consolas;
    font-weight: bold;
  }

  .terminal-container-errortext {
    color: darkorange;
  }
</style>