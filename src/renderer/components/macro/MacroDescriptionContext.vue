<template>
  <div class="macro-description-context">
    <v-runtime-template :template="getParsedMacroDescription"></v-runtime-template>
    <section v-if="isNeedContextmenu" :style="{left: button.x + 'px', top: button.y + 'px' }">
      <input type="text" placeholder="찾을 내용을 입력하세요" @blur="button = null">
      <ul v-if="lists.length">
        <li v-for="list in lists" :key="list">{{ list }}</li>
      </ul>
      <div class="empty" v-else>
        아무것도 없습니다
      </div>
    </section>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'

  import electron from 'electron'

  export default {
    components: {
      VRuntimeTemplate
    },
    props: {
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

          case 'value':
            break;

          default:
            break;

        }

      }

    },
    methods: {

      openContextmenu(e, type) {

        let clientRect
        let macro

        clientRect = e.currentTarget.getBoundingClientRect()
        macro = this.macro

        this.button = {
          x: clientRect.x,
          y: clientRect.y + 25,
          type
        }

        this.$nextTick(() => {
          //this.$el.querySelector('input').focus()
        })

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

    >section {
      width: 200px;
      max-height: 350px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
      background-color: white;
      position: fixed;
      overflow: hidden;
      overflow-y: scroll;

      >input {
        width: 100%;
        height: 30px;
        font-size: small;
        border: 0;
        outline: 0;
        box-sizing: border-box;
        padding: 0 10px;
      }

      >ul {
        list-style: none;
        padding: 10px 0;
        margin: 0;

        >li {
          >a {
            height: 30px;
            color: inherit;
            line-height: 30px;
            display: block;
            padding: 0 10px;
            margin: 0;
            text-decoration: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
              background-color: #efefef;
            }
          }
        }
      }

      >div.empty {
        color: lightgray;
        text-align: center;
        margin: 20px 0;
      }
    }

  }
</style>