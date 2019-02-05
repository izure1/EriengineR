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

        // 매크로의 설명문의 변수 부문을 variables 값에서 받아넣습니다
        description = this.current.description
        description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

          match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
          match =
            `<a href='#' @click="openInputField($event, '${match}')">${this.getDescriptionVariable(match)}</a>`

          return match

        })

        //this.done = this.getDoneLists(variables)

        return `<p>${description}</p>`

      }

    },
    methods: {

      getDescriptionVariable(property) {

        if (!this.scriptContext) {
          return ''
        }

        let language, text
        let macroVar, currentVar

        macroVar = this.current.variables[property]
        currentVar = this.scriptContext.variables[property]


        // 스크립트 컨텍스트가 비어있을 경우, 매크로의 기본값을 반환합니다
        if (!(property in currentVar)) {
          return macroVar.text
        }

        // 다국어를 지원하는 변수가 아닐 경우, 텍스트를 반환합니다
        if (typeof currentVar.text === 'string') {
          return currentVar.text
        }

        // 현재 기본언어가 목록 안에 존재하지 않을 경우, 매크로의 기본값을 반환합니다
        if (!(this.language in currentVar)) {
          return macroVar.text
        }

        return currentVar[this.language]

      },

      getDoneLists(variables) {

        let returnValue
        let variable

        returnValue = {}

        for (let i in variables) {

          variable = variables[i]

          returnValue[i] = false

          // 스킵이 가능한 변수거나, 매크로를 수정하는 단계라면 넘어갑니다
          if (variable.skip) {
            returnValue[i] = true
          }

        }

        return returnValue

      },

      openInputField(e, name) {

        let current
        let browser, uri
        let variable


        variable = this.current.variables[name]

        current = electron.remote.getCurrentWindow()
        uri = getResolvedURI(current.webContents.getURL(), `/macro-input/${variable.type}`)

        browser = new electron.remote.BrowserWindow({
          modal: true,
          darkTheme: true,
          frame: false,
          parent: current,
          height: 350
        })

        browser.loadURL(uri)
        browser.setMenu(null)

        browser.on('closed', () => browser = null)

        // 입력이 끝나면 스크립트 컨텍스트 내부 변수를 수정합니다
        browser.on('macro-input-done', value => {
          this.scriptContext.variables[name].text = value
        })

      }

    },

    created() {

      let browser

      browser = electron.remote.getCurrentWindow()

      browser.on('macro-set', (scriptContext) => {
        this.scriptContext = scriptContext
      })
      browser.emit('macro-ready')

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