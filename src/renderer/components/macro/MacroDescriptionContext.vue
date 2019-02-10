<template>
  <div class="macro-description-context">
    <v-runtime-template :template="getParsedMacroDescription"></v-runtime-template>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'
  import electron from 'electron'

  import getResolvedURI from '@static/js/getResolvedURI'


  export default {
    components: {
      VRuntimeTemplate
    },
    props: {
      current: Object
    },
    data() {
      return {
        updated: performance.now(),
        win: electron.remote.getCurrentWindow(),
        scriptContext: null,
        button: null,
        done: {}
      }
    },
    computed: {

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
        description = this.current.description
        description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

          match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
          match =
            `<a href='#' @click="openInputField($event, '${match}')">${this.getDescriptionVariable(match)}</a>`

          return match

        })

        return `<p>${description}</p>`

      }

    },
    methods: {

      deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
      },

      getCombineVariables(property) {

        let variables = {}

        for (let i in this.current.variables) {

          variables[i] =

            i in this.scriptContext.variables ?

            this.deepCopy(this.scriptContext.variables[i]) :
            this.deepCopy(this.current.variables[i])

        }

        return variables[property]

      },

      getDescriptionVariable(property) {

        if (!this.scriptContext) {
          return ''
        }

        let variable
        let origin

        variable = this.getCombineVariables(property)

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
        if (typeof variable.text === 'string') {
          return variable.text
        }

        // 현재 기본언어가 목록 안에 존재하지 않을 경우, 매크로의 기본값을 반환합니다
        if (!(this.language in variable.text)) {
          return this.current.variables[property].text
        }

        return variable.text[this.language] || ' '

      },

      openInputField(e, name) {

        let current
        let browser
        let variable


        variable = this.current.variables[name]

        browser = new electron.remote.BrowserWindow({
          modal: true,
          darkTheme: true,
          frame: false,
          parent: this.win,
          height: 350
        })


        browser.uri = getResolvedURI(this.win.webContents.getURL(), `/macro-input/${variable.type}`)
        browser.loadURL(browser.uri)
        browser.setMenu(null)

        browser.on('closed', () => browser = null)
        browser.on('macro-input-done', value => {
          this.updateVariable(name, value)
        })

      },

      updateVariable(name, value) {

        if (!(name in this.scriptContext.variables)) {
          this.scriptContext.variables[name] = this.deepCopy(this.current.variables[name])
        }

        this.scriptContext.variables[name].text = value
        this.updated = performance.now()

      }

    },

    created() {

      this.win.on('macro-set', scriptContext => this.scriptContext = scriptContext)
      this.win.emit('macro-ready')

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
    color: lightgreen !important;
    text-decoration: none;
    margin: 0 5px;
  }
</style>