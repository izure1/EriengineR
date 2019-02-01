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

      getContextValue(){

        let variables

        variables = this.current.variables

        if (this.scriptContext) {
          variables = Object.assign({}, this.current.variables, this.scriptContext.variables)
        }

        return variables

      },

      // 매크로 내부의 description 과, 물려받은 props.variables 을 기반으로
      // 매크로 내용물을 HTML 코드로 만들어 반환합니다
      getParsedMacroDescription() {

        let description

        // 매크로의 설명문의 변수 부문을 variables 값에서 받아넣습니다
        description = this.current.description
        description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

          match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
          match = `<a href='#' @click="openInputField($event, '${match}')">${this.getContextValue[match].text}</a>`

          return match

        })

        //this.done = this.getDoneLists(variables)

        return `<p>${description}</p>`

      }

    },
    methods: {

      getDoneLists(variables) {

        let returnValue
        let variable

        returnValue = {}

        for (let i in variables) {

          variable = variables[i]

          returnValue[i] = false

          // 스킵이 가능한 변수거나, 매크로를 수정하는 단계라면 넘어갑니다
          if (variable.skip || this.scriptContext.modifyMode) {
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
          parent: current,
          height: 350
        })

        browser.loadURL(uri)
        browser.setMenu(null)

        browser.on('closed', () => browser = null)

        // 입력이 끝나면 스크립트 컨텍스트 내부 변수를 수정합니다
        browser.on('macro-input-done', value => {
          this.scriptContext.variables[name] = value
          console.log(value, this.scriptContext, this.getContextValue, this)
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