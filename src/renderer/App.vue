<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
  import electron from 'electron'

  export default {
    name: 'eriengine',
    methods: {

      listenFromMain() {

        let vue = this

        // main 프로세스에서 renderer에 접근할 수 없기 때문에 해당 방법으로 vue 이벤트를 발생시킵니다
        // 이는 사용자와 주로 소통하는 menu 등에서 사용됩니다

        electron.ipcRenderer.on('vue-emit', function (e, argument) {
          vue.$root.$emit(...argument)
        })

      }

    },
    created() {
      this.listenFromMain()
    }
  }
</script>

<style lang="scss">
  $test: #333;

  @import '~material-design-icons-iconfont/dist/material-design-icons.css';
  @import '~vuetify/dist/vuetify.min.css';

  /* COMMON CSS */
  @font-face {
    font-family: 'NanumBarunGothicUltraLight';
    src: url('~@/assets/fonts/NanumBarunGothicUltraLight.woff');
  }

  @font-face {
    font-family: 'NanumGothic';
    src: url('~@/assets/fonts/NanumGothic.woff');
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;

    &:hover {
      background-color: rgba(200, 200, 200, 0.2);
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  *:not(input),
  *:not(textarea) {
    user-select: none;
  }

  html,
  body {
    overflow: hidden;
  }

  #app {
    color: lightgray;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    font-family: 'NanumBarunGothicUltraLight', 돋움, 굴림;
    padding: 0;
    margin: 0;
  }

  .ui-resizable-e {
    right: 0;
  }

  // .v-btn:not(.v-btn--icon) {
  //   .v-icon {
  //     margin-right: 0.4em;
  //   }
  // }

  .v-icon {
    vertical-align: middle;
  }

  .v-dialog--fullscreen {
    height: calc(100% - 30px);
    top: 30px;
  }
</style>