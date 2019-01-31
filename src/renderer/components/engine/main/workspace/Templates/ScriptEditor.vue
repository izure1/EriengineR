<template>
  <div class="template-scripteditor">
    <div>
      <h6>
        사건
        <v-icon color="white">hearing</v-icon>
      </h6>
      <p>아래 내용이 발생했을 때 작동합니다</p>
      <ul v-if="data.events.length">
        <li v-for="(event, index) in data.events" :key="index">
          <a href="#" @click="modifyMacro(data, event, 'events')">{{ event.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro(data, 'events')" v-if="!data.events.length">+</a>
    </div>
    <div>
      <h6>
        조건
        <v-icon color="white">filter_list</v-icon>
      </h6>
      <p>위 사건이 발생했지만, 아래 내용이 모두 충족되어야 합니다. 원한다면 아무것도 넣지 않아도 됩니다</p>
      <ul v-if="data.conditions.length">
        <li v-for="(condition, index) in data.conditions" @dblclick="modifyItem(condition)" :key="index">
          <a href="#" @click="modifyMacro(data, condition, 'conditions')">{{ condition.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro(data, 'conditions')">+</a>
    </div>
    <div>
      <h6>
        행동
        <v-icon color="white">directions_run</v-icon>
      </h6>
      <p>모든 조건이 만족하면 순서대로 실행됩니다</p>
      <ul v-if="data.actions.length">
        <li v-for="(action, index) in data.actions" @dblclick="modifyItem(action)" :key="index">
          <a href="#" @click="modifyMacro(data, action, 'actions')">{{ action.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro(data, 'actions')">+</a>
    </div>
  </div>
</template>

<script>
  import url from 'url'
  import path from 'path'
  import electron from 'electron'

  import getResolvedURI from '@static/js/getResolvedURI'
  import createUUID from '@static/js/createUUID'


  export default {
    props: ['data'],
    methods: {

      modifyMacro(script, scriptContext, column) {
        this.openMacroTab(script.path, scriptContext, column)
      },

      createMacro(script, column) {

        let scriptContext

        scriptContext = {
          cid: script.cid
        }

        this.openMacroTab(script.path, scriptContext, column)

      },

      openMacroTab(scriptPath, scriptContext, column) {

        let browser
        let parent, childURI


        parent = electron.remote.getCurrentWindow()

        childURI = parent.webContents.getURL()
        childURI = getResolvedURI(childURI, `/macro/${column}`)


        // 스크립트의 경로와 해당 매크로의 저장된 내용을 저장해둡니다
        // 이는 이후 Macro 윈도우에서 가져와서 사용될 것입니다

        electron.ipcRenderer.send('macro-set', scriptPath, scriptContext)
        electron.ipcRenderer.once('macro-set', () => {

          browser = new electron.remote.BrowserWindow({
            width: 1024,
            height: 600,
            modal: true,
            parent
          })

          browser.setMenu(null)
          browser.loadURL(childURI)
          browser.on('closed', () => browser = null)

        })

      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-scripteditor {
    height: 100%;
    padding: 30px;
    box-sizing: border-box;

    >div {
      margin: 0 0 50px;

      >h6 {
        font-size: xx-large;
        margin: 10px 0;
      }

      >p {
        font-size: small;
        margin: 0 0 20px;
      }

      >ul {
        list-style: none;
        padding-left: 20px;

        >li {
          margin: 10px 0;

          >a {
            font-size: 13pt;
            color: gray;
            text-decoration: none;
            display: inline-block;

            &:hover {
              font-weight: bold;
              color: black;
            }
          }

          &::before {
            content: '';
            width: 10px;
            height: 10px;
            display: inline-block;
            background: url('~@/assets/img/ico_arrow_right.svg') no-repeat;
            background-size: cover;
            margin-right: 10px;
            opacity: 0.4;
          }
        }
      }

      >a {
        width: 30px;
        height: 30px;
        font-size: xx-large;
        font-weight: bold;
        color: white;
        text-align: center;
        line-height: 35px;
        text-decoration: none;
        display: block;
        background-color: rgba(0, 0, 0, .3);
        transition: transform 0.15s ease-in-out;

        &:hover {
          transform: rotate(180deg)
        }
      }
    }
  }
</style>