<template>
  <div class="macro-description-context" v-if="isReady">
    <v-runtime-template :template="getParsedMacroDescription"></v-runtime-template>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'
  import electron from 'electron'
  import ModalWindow from '@/modalWindow/ModalWindow'

  import getResolvedURI from '@common/js/getResolvedURI'


  export default {
    components: {
      VRuntimeTemplate
    },
    props: {
      macro: Object, // 현재 선택된 매크로의 원본입니다
      current: Object, // 현재 수정 중인 매크로 파일 정보입니다
    },
    data: () => ({
      updated: performance.now(),
      win: electron.remote.getCurrentWindow(),
      button: null,
      done: {}
    }),
    computed: {

      isReady() {
        return this.current && this.macro
      },

      language() {
        return electron.ipcRenderer.sendSync('language-get-default')
      },

      /**
       * 
       * @description 
       * 매크로 내부의 description 과, 물려받은 props.variables 을 기반으로
       * 매크로 내용물을 HTML 코드로 만들어 반환합니다
       * 
       * @returns {String}  매크로 문자열을 HTML 형식으로 반환합니다
       */
      getParsedMacroDescription() {

        let description
        let updated


        /**
         * 
         * FIXME
         * 
         * v-runtime-template 을 업데이트합니다.
         * 
         * updated = this.updated 문장은 아무런 쓸모도 없는 것처럼 보이지만
         * this.updated 의 get() 을 호출함으로써, 호출 메서드인 getparseMacroDescription 을 강제로 업데이트합니다.
         * 
         * 이는 v-runtime-template 와 Vue의 업데이트 문제점을 위한 임시 조치입니다.
         * Vue가 개선되면 삭제해야 합니다.
         * 
         */
        updated = this.updated


        // 매크로의 설명문의 변수 부문을 variables 값에서 받아넣습니다
        description = this.macro.description
        description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

          match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
          match =
            `<a href='#' @click="openInputField($event, '${match}')" :class="{done: isDone('${match}')}">${this.getDescriptionVariable(match)}</a>`

          return match

        })

        return `<p>${description}</p>`

      }

    },
    methods: {

      deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
      },

      isDone(name) {
        return this.current.variables[name].inputted
      },

      getDescriptionVariable(property) {
        return this.current.variables[property].text
      },

      openInputField(e, name) {

        let current
        let browser

        browser = new ModalWindow({
          modal: true,
          parent: this.win,
          width: 800,
          height: 350
        })

        browser.createWindow('/components/macro/MacroInput', {
          type: this.macro.variables[name].type,
          variable: this.current.variables[name],
          origin: this.macro.variables[name]
        })

        browser.done(value => {
          this.updateVariable(name, value)
        })

      },

      updateVariable(name, value) {

        this.current.variables[name].value = value
        this.current.variables[name].inputted = true

        this.updated = performance.now()
        this.checkSavable()

      },

      /**
       * @description
       * 모든 매크로의 변수를 입력해서 저장 가능한 상태가 되었다면 작성 완료 이벤트(macro-modified)를 보냅니다.
       * 이는 ScriptEditor.vue 로 전송됩니다.
       */
      checkSavable() {

        let results

        results = Object.keys(this.macro.variables)
        results = results.map(name => !!this.current.variables[name].inputted)

        // 매크로에 변수의 추가 입력이 필요할 경우
        if (results.includes(false)) {
          this.win.emit('macro-savable', null)
          return
        }

        // 매크로에 모든 변수가 입력되어 세이브가 가능할 경우
        this.current.text = this.current.getDescriptionFromMacro(this.language)
        this.win.emit('macro-savable', this.current)

      }

    },

    created() {

      // 변수 입력이 필요없는 매크로일 경우, 바로 저장 버튼이 활성화되어야 합니다
      this.checkSavable()

    }

  }
</script>

<style lang="scss" scoped>
  .macro-description-context {
    >p {
      font-family: 'NanumGothic';
      line-height: 1.5;
      letter-spacing: -1px;
    }
  }
</style>

<style lang="scss">
  .macro-description-context a {
    color: gray !important;
    text-decoration: none;
    margin: 0 5px;

    &.done {
      color: lightgreen !important;
    }
  }
</style>