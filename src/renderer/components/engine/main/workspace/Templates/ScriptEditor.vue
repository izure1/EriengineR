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
          <a href="#" @click="modifyMacro(event, 'events')">{{ event.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro('events')" v-if="!data.events.length">+</a>
    </div>
    <div>
      <h6>
        조건
        <v-icon color="white">filter_list</v-icon>
      </h6>
      <p>위 사건이 발생했지만, 아래 내용이 모두 충족되어야 합니다. 원한다면 아무것도 넣지 않아도 됩니다</p>
      <ul v-if="data.conditions.length">
        <li v-for="(condition, index) in data.conditions" @dblclick="modifyItem(condition)" :key="index">
          <a href="#" @click="modifyMacro(condition, 'conditions')">{{ condition.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro('conditions')">+</a>
    </div>
    <div>
      <h6>
        행동
        <v-icon color="white">directions_run</v-icon>
      </h6>
      <p>모든 조건이 만족하면 순서대로 실행됩니다</p>
      <ul v-if="data.actions.length">
        <li v-for="(action, index) in data.actions" @dblclick="modifyItem(action)" :key="index">
          <a href="#" @click="modifyMacro(action, 'actions')">{{ action.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro('actions')">+</a>
    </div>
  </div>
</template>

<script>
  import url from 'url'
  import path from 'path'
  import electron from 'electron'

  import getResolvedURI from '@static/js/getResolvedURI'
  import createUUID from '@static/js/createUUID'
  import {
    ScriptContext
  } from './js/Script'


  export default {
    props: ['data'],
    methods: {

      // 스크립트를 수정한다면 스크립트 컨텍스트 객체를 복사하고, 수정모드로 탭을 엽니다
      modifyMacro(scriptContext, column) {
        this.openMacroTab(new ScriptContext(scriptContext), column)
      },

      // 스크립트를 추가한다면 새로운 스크립트 컨텍스트 객체를 생성하고, 생성모드로 탭을 엽니다
      createMacro(column) {
        this.openMacroTab(new ScriptContext, column)
      },

      openMacroTab(scriptContext, column) {

        let browser
        let parent, childURI


        parent = electron.remote.getCurrentWindow()

        childURI = parent.webContents.getURL()
        childURI = getResolvedURI(childURI, `/macro/${column}`)


        // 스크립트의 경로와 해당 매크로의 저장된 내용을 저장해둡니다
        // 이는 이후 Macro 윈도우에서 가져와서 사용될 것입니다

        browser = new electron.remote.BrowserWindow({
          width: 1024,
          height: 600,
          modal: true,
          darkTheme: true,
          frame: false,
          parent
        })

        browser.setMenu(null)
        browser.loadURL(childURI)


        browser.on('closed', () => browser = null)

        // 모달이 준비되면 매크로 데이터를 전송합니다
        browser.on('macro-ready', () => {
          browser.emit('macro-set', scriptContext)
        })

        // 모달 내에서 매크로가 수정되면 스크립트에 대입하고 저장합니다
        // 이는 사용자가 저장 버튼을 눌렀을 때 적용됩니다
        browser.on('macro-modify', modifiedContext => {

          let contexts

          contexts = data[column]
          contexts = contexts.filter(context => context.id === scriptContext.id)

          // 기존 컨텍스트에 있다면 수정모드이므로, 해당 스크립트를 수정합니다
          if (contexts.length) {
            contexts[0].from(modifiedContext)
          } else {
            contexts.push(modifiedContext)
          }

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