<template>
  <div class="template-scripteditor">
    <div>
      <h6>
        사건
        <v-icon color="white">hearing</v-icon>
      </h6>
      <p>아래 내용이 발생했을 때 작동합니다. 비우면 이 스크립트는 스스로 작동하지 않습니다</p>
      <ul v-if="events.length">
        <li v-for="(event, index) in events" :key="index">
          <v-btn icon @click="deleteMacro(event.id)" class="mr-0" small>
            <v-icon color="grey" size="standard" small>clear</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(event.id)">{{ getMacroDescription(event) }}</a>
        </li>
      </ul>
      <a href="#" @click="createNewMacro('events')" v-else>+</a>
    </div>
    <div>
      <h6>
        조건
        <v-icon color="white">filter_list</v-icon>
      </h6>
      <p>위 사건이 발생했지만, 아래 내용이 모두 충족되어야 합니다. 원한다면 아무것도 넣지 않아도 됩니다</p>
      <ul v-if="conditions.length">
        <li v-for="(condition, index) in conditions" @dblclick="modifyItem(condition)" :key="index">
          <v-btn icon @click="deleteMacro(condition.id)" class="mr-0" small>
            <v-icon color="grey" size="standard" small>clear</v-icon>
          </v-btn>
          <v-btn icon @click="copyMacro(condition.id)" class="ml-0" small>
            <v-icon color="grey" size="standard" small>file_copy</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(condition.id)">{{ getMacroDescription(condition) }}</a>
        </li>
      </ul>
      <a href="#" @click="createNewMacro('conditions')">+</a>
    </div>
    <div>
      <h6>
        행동
        <v-icon color="white">directions_run</v-icon>
      </h6>
      <p>모든 조건이 만족하면 순서대로 실행됩니다</p>
      <ul v-if="actions.length">
        <li v-for="(action, index) in actions" @dblclick="modifyItem(action)" :key="index">
          <v-btn icon @click="deleteMacro(action.id)" class="mr-0" small>
            <v-icon color="grey" size="standard" small>clear</v-icon>
          </v-btn>
          <v-btn icon @click="copyMacro(action.id)" class="ml-0" small>
            <v-icon color="grey" size="standard" small>file_copy</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(action.id)">{{ getMacroDescription(action) }}</a>
        </li>
      </ul>
      <a href="#" @click="createNewMacro('actions')">+</a>
    </div>
    <v-divider></v-divider>
    <div class="template-scripteditor-actions">
      <div>
        <v-textarea label="이 스크립트의 간략한 설명을 입력하세요. 스크립트 뷰어에서 주석으로 보여집니다." no-resize solo flat v-model="data.comment"
          counter="50" :rules="[v => v.length <= 50 || '너무 길어요. 주석은 간결한 게 알아보기 더 쉽습니다.']" success></v-textarea>
      </div>
      <v-btn large @click="saveScript">
        <v-icon left>save</v-icon>스크립트 저장
      </v-btn>
      <v-btn large @click="cancelScript">
        <v-icon left>clear</v-icon>취소
      </v-btn>
    </div>
    <v-dialog v-model="modifyMode" width="80%">
      <macro-modal :information="modifyInformation" @done="insertMacro"></macro-modal>
    </v-dialog>
  </div>
</template>

<script>
  import url from 'url'
  import path from 'path'
  import {
    remote,
    ipcRenderer,
  } from 'electron'

  import getResolvedURI from '@common/js/getResolvedURI'
  import createUID from '@common/js/createUID'
  import Macro from '@common/js/Macro'

  import MacroModal from '@/components/Macro/Component'


  export default {

    props: ['data'],
    components: {
      MacroModal
    },

    data: () => ({

      events: [],
      conditions: [],
      actions: [],

      current: null,
      modifyMode: false,
      modifyInformation: null

    }),

    methods: {

      deepCopy(o) {
        return JSON.parse(JSON.stringify(o))
      },

      getInformationFromId(id) {

        let target
        let contexts, column, index, macro

        target = {
          events: this.events,
          conditions: this.conditions,
          actions: this.actions,
        }

        for (let i in target) {

          contexts = target[i]
          column = i
          index = 0

          let len
          for (index = 0, len = contexts.length; index < len; index++) {

            macro = contexts[index]

            if (macro.id !== id) {
              continue
            }

            return {
              contexts,
              column,
              index,
              macro,
            }

          }

        }

        return {}

      },

      deleteMacro(id) {

        let {
          contexts,
          index,
        } = this.getInformationFromId(id)

        contexts.splice(index, 1)

      },

      copyMacro(id) {

        let {
          contexts,
          index,
          macro,
        } = this.getInformationFromId(id)

        contexts.splice(index, 0, macro.copy())

      },

      // 스크립트를 수정한다면 스크립트 컨텍스트 객체를 복사하고, 수정모드로 탭을 엽니다
      modifyMacro(id) {

        let {
          macro,
          column,
        } = this.getInformationFromId(id)

        this.current = macro
        this.openMacroTab(column, this.current)

      },

      // 스크립트를 추가한다면 새로운 스크립트 컨텍스트 객체를 생성하고, 생성모드로 탭을 엽니다
      createNewMacro(column) {
        this.current = null
        this.openMacroTab(column, this.current)
      },

      getMacroDescription(macroInfo) {

        let macro
        let origin
        let description

        macro = new Macro
        macro.parseFromInformation(macroInfo)

        origin = ipcRenderer.sendSync('macro-get-information', macro.origin)
        description = origin.description

        if (!description) {
          return ''
        }

        return macro.parseDescription(description)

      },

      tabClose() {
        this.$root.$emit('close-workspace', this.data.id)
      },

      openMacroTab(column, old) {

        this.modifyMode = true
        this.modifyInformation = {
          column,
          old
        }

      },

      saveScript() {

        let filepath = ipcRenderer.sendSync('script-get-path', this.data.id)

        if (!filepath) {
          remote.dialog.showErrorBox('파일 삭제됨', '해당 파일이 저장될 위치에 파일이 더이상 존재하지 않습니다.')
          return
        }

        ipcRenderer.sendSync('script-write', filepath, this.data)

        this.tabClose()

      },

      cancelScript() {
        this.tabClose()
      },

      insertMacro(modifiedMacro) {

        // 모달 내에서 매크로가 수정되면 스크립트에 대입하고 저장합니다
        // 이는 사용자가 저장 버튼을 눌렀을 때 적용됩니다

        let {
          contexts,
          index,
          macro,
        } = this.getInformationFromId(modifiedMacro.id)

        // 기존 컨텍스트에 있다면 수정모드이므로, 해당 스크립트를 수정합니다
        if (macro) {
          contexts.splice(index, 1, modifiedMacro)
        }
        // 존재하지 않는다면 생성모드이므로, 해당 스크립트에 추가합니다
        else {

          let {
            column
          } = this.modifyInformation

          contexts = this[column]
          contexts.push(modifiedMacro)

        }

        this.modifyMode = false

      }

    },

    created() {
      this.events = this.data.events
      this.conditions = this.data.conditions
      this.actions = this.data.actions
    },

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
        padding: 0;

        >li {
          margin: 0;
          display: flex;
          flex-direction: row;

          >* {
            flex: 0 0 30px;
          }

          >a {
            height: 30px;
            font-size: 13px;
            color: grey;
            line-height: 30px;
            text-decoration: none;
            letter-spacing: -1px;
            word-spacing: 1px;
            transition: color 0.15s linear;
            flex: 1 1 auto;
            margin-left: 10px;

            &:hover {
              color: white;
            }
          }

          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
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
        margin-top: 15px;
        background-color: rgba(0, 0, 0, .3);
        transition: transform 0.15s ease-in-out;

        &:hover {
          transform: rotate(180deg)
        }
      }
    }

    .template-scripteditor-actions {
      margin-top: 10px;
      text-align: right;
    }
  }
</style>