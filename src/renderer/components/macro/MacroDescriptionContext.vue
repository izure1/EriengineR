<template>
  <div class="macro-description-context" v-if="isReady">
    <v-runtime-template :template="getParsedMacroDescription"></v-runtime-template>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'
  import electron from 'electron'
  import ModalWindow from '@/modalWindow/ModalWindow'

  import getResolvedURI from '@static/js/getResolvedURI'


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
        return !!this.getCombineVariable(name).skip
      },

      getCombineVariable(property) {

        return property in this.current.variables ?

          this.deepCopy(this.current.variables[property]) :
          this.deepCopy(this.macro.variables[property])

      },

      getCombineVariables() {

        let variables = {}

        for (let i in this.macro.variables) {
          variables[i] = this.getCombineVariable(i)
        }

        return variables

      },

      getDescriptionVariable(property) {

        if (!this.macro) {
          return ''
        }

        let variable
        let origin

        variable = this.getCombineVariable(property)

        /**
         * 
         * variable 설명
         * 
         * 기본적인 매크로 구조는 아래와 같습니다.
         * 자세한 내용은 static/assets/macro/.../xxx.js 파일을 참고하시길 바랍니다.
         * 
         * {
         *  cid: 'xxxxxxx...',
         *  title: '매크로 제목',
         *  description: '해당 매크로의 내용',
         *  variables: {
         *    '객체': {  // ---------------------->> variables 속성값 중, 매치되는 변수명(매개변수 property)의 속성값을 가져옵니다
         *      text: '객체명',
         *      ...
         *    }
         *  }
         * 
         * }
         * 
         */

        // 다국어를 지원하는 변수가 아닐 경우, 텍스트를 반환합니다
        if (typeof variable.text !== 'object') {
          return variable.text
        }

        // 현재 기본언어가 목록 안에 존재하지 않을 경우, 매크로의 기본값을 반환합니다
        if (!(this.language in variable.text)) {
          return this.macro.variables[property].text
        }

        return variable.text[this.language] || ' '

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
          variable: this.getCombineVariable(name)
        })

        browser.done(value => {
          this.updateVariable(name, value)
        })

      },

      updateVariable(name, value) {

        if (!(name in this.current.variables)) {
          this.current.variables[name] = this.deepCopy(this.macro.variables[name])
        }

        this.current.variables[name] = this.deepCopy(value)
        this.current.variables[name].skip = true

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
        results = results.map(name => !!this.getCombineVariable(name).skip)

        // 매크로에 변수의 추가 입력이 필요할 경우
        if (results.includes(false)) {
          this.win.emit('macro-savable', null)
          return
        }

        // 매크로에 모든 변수가 입력되어 세이브가 가능할 경우
        this.current.macro = this.macro.cid
        this.current.text = this.current.getDescriptionFromMacro(this.macro, this.language)
        this.current.variables = this.getCombineVariables()

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