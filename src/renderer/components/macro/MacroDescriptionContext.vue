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
      current: Object,
      macro: Object
    },
    data() {
      return {
        button: null,
        lists: []
      }
    },
    computed: {

      // 매크로 내부의 description 과, 물려받은 props.variables 을 기반으로
      // 매크로 내용물을 HTML 코드로 만들어 반환합니다
      getParsedMacroDescription() {

        let variables
        let description

        variables = this.macro.variables


        // 매크로를 수정할 경우, this.current.cid 값이 지정되어 있습니다.
        // 이 값이 서로 일치할 경우, variables 값을 덮어씁니다
        if (this.macro.cid === this.current.cid) {
          variables = Object.assign({}, this.macro.variables, this.current.variables)
        }


        // 매크로의 설명문의 변수 부문을 variables 값에서 받아넣습니다
        description = this.macro.description
        description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

          match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
          match = `<a href='#' @click="openContextmenu($event, '${match}')">${variables[match].text}</a>`

          return match

        })

        return `<p>${description}</p>`

      },

      isNeedContextmenu() {

        if (!this.button) {
          return false
        }

        switch (this.macro.type) {

          case 'radio':
            break;

          case 'file':
            break;

          case 'text':
          default:
            break;

        }

      }

    },
    methods: {

      openContextmenu(e, type) {

        let current
        let browser
        let uri


        current = electron.remote.getCurrentWindow()
        uri = getResolvedURI(current.webContents.getURL(), `/macro-input/text`)

        browser = new electron.remote.BrowserWindow({
          modal: true,
          parent: current
        })

        browser.loadURL(uri)
        browser.setMenu(null)
        browser.on('closed', () => browser = null)

      }

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
    color: lightgreen;
    margin: 0 5px;
  }
</style>