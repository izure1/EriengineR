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
          <v-btn icon @click="deleteMacro(event.id, 'events')" class="mr-0" small>
            <v-icon color="grey" size="standard">delete_outline</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(event.id, 'events')">{{ event.text }}</a>
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
          <v-btn icon @click="deleteMacro(condition.id, 'conditions')" class="mr-0" small>
            <v-icon color="grey" size="standard">delete_outline</v-icon>
          </v-btn>
          <v-btn icon @click="copyMacro(condition.id, 'conditions')" class="ml-0" small>
            <v-icon color="grey" size="standard">file_copy</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(condition.id, 'conditions')">{{ condition.text }}</a>
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
          <v-btn icon @click="deleteMacro(action.id, 'actions')" class="mr-0" small>
            <v-icon color="grey" size="standard">delete_outline</v-icon>
          </v-btn>
          <v-btn icon @click="copyMacro(action.id, 'actions')" class="ml-0" small>
            <v-icon color="grey" size="standard">file_copy</v-icon>
          </v-btn>
          <a href="#" @click="modifyMacro(action.id, 'actions')">{{ action.text }}</a>
        </li>
      </ul>
      <a href="#" @click="createMacro('actions')">+</a>
    </div>
    <v-divider></v-divider>
    <div class="template-scripteditor-actions">
      <v-btn large @click="saveScript">
        <v-icon left>save</v-icon>스크립트 저장
      </v-btn>
      <v-btn large @click="cancelScript">
        <v-icon left>delete_forever</v-icon>취소
      </v-btn>
    </div>
    <v-dialog v-model="modifyMode" width="1024" height="600">
      <macro-modal :information="modifyInformation"></macro-modal>
    </v-dialog>
  </div>
</template>

<script>
  import url from 'url'
  import path from 'path'
  import electron from 'electron'

  import getResolvedURI from '@common/js/getResolvedURI'
  import createUUID from '@common/js/createUUID'

  import MacroModal from '@/components/macro/Macro'


  export default {

    props: ['data'],
    components: {
      MacroModal
    },

    data: () => ({
      current: null,
      modifyMode: false,
      modifyInformation: null
    }),

    methods: {

      deleteMacro(id, column) {

        let contexts
        let offset

        contexts = this.data[column]
        offset = this.getMacroOffset(contexts, id)

        contexts.splice(offset, 1)

      },

      copyMacro(id, column) {

        let contexts, context
        let offset

        contexts = this.data[column]
        offset = this.getMacroOffset(contexts, id)

        context = contexts[offset]
        context.id = createUUID()


        if (context.variables) {

          let v

          for (let p in context.variables) {

            v = context.variables[p]
            v.id = createUUID()

            if (v.type === 'text') {
              v.value = '입력하세요'
            }

          }

        }

        contexts.splice(offset, 0, context)

      },

      // 스크립트를 수정한다면 스크립트 컨텍스트 객체를 복사하고, 수정모드로 탭을 엽니다
      modifyMacro(id, column) {

        let contexts
        let offset

        contexts = this.data[column]
        offset = this.getMacroOffset(contexts, id)

        this.current = contexts[offset]
        this.openMacroTab(column, this.current)

      },

      // 스크립트를 추가한다면 새로운 스크립트 컨텍스트 객체를 생성하고, 생성모드로 탭을 엽니다
      createMacro(column) {
        this.current = null
        this.openMacroTab(column, this.current)
      },

      getMacroOffset(contexts, id) {

        let offset = -1

        for (let i = 0, len = contexts.length; i < len; i++) {

          if (contexts[i].id === id) {
            offset = i
            break
          }

        }

        return offset

      },

      tabClose() {
        this.$root.$emit('closeWorkspaceTab', this.data.id)
      },

      openMacroTab(column, old) {

        this.modifyMode = true
        this.modifyInformation = {
          column,
          old
        }


        // 스크립트의 경로와 해당 매크로의 저장된 내용을 저장해둡니다
        // 이는 이후 Macro 윈도우에서 가져와서 사용될 것입니다

        // browser = new electron.remote.BrowserWindow({
        //   width: 1024,
        //   height: 600,
        //   modal: true,
        //   darkTheme: true,
        //   frame: false,
        //   parent,
        //   webPreferences: {
        //     webSecurity: false
        //   }
        // })

        // browser.setMenu(null)
        // browser.loadURL(childURI)


        // browser.on('closed', () => browser = null)

        // // 모달 윈도우로 이전 매크로 정보를 보냅니다.
        // // 매크로를 수정하는 용도로 사용합니다
        // browser.on('macro-input-ready', () => {
        //   browser.emit('macro-send-old', old)
        // })

        // // 모달 내에서 매크로가 수정되면 스크립트에 대입하고 저장합니다
        // // 이는 사용자가 저장 버튼을 눌렀을 때 적용됩니다
        // browser.on('macro-saved', modifiedMacro => {

        //   let contexts
        //   let offset

        //   contexts = this.data[column]
        //   offset = this.getMacroOffset(contexts, modifiedMacro.id)

        //   // 기존 컨텍스트에 있다면 수정모드이므로, 해당 스크립트를 수정합니다
        //   if (offset !== -1) {
        //     contexts.splice(offset, 1, modifiedMacro)
        //   }
        //   // 존재하지 않는다면 생성모드이므로, 해당 스크립트에 추가합니다
        //   else {
        //     contexts.push(modifiedMacro)
        //   }

        // })

      },

      saveScript() {

        let filepath

        filepath = electron.ipcRenderer.sendSync('script-get-filepath', this.data.id)

        if (!filepath) {
          electron.remote.dialog.showErrorBox('파일 삭제됨', '해당 파일이 저장될 위치에 파일이 더이상 존재하지 않습니다.')
          return
        }

        electron.ipcRenderer.sendSync('script-write', filepath, this.data)

        this.tabClose()

      },

      cancelScript() {
        this.tabClose()
      }

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
        padding: 0;

        >li {
          margin: 0;

          >a {
            font-size: 13px;
            letter-spacing: -1px;
            word-spacing: 1px;
            color: gray;
            text-decoration: none;
            display: inline-block;
            transition: color 0.15s linear;
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