<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'eriengine',
    mounted() {
      let a = this
      this.$root.$emit('createWorkspaceTab', 'asdf', '테스트', 'SCRIPT-VIEWER')
      this.$root.$emit('createWorkspaceTab', 'asdf1', '테스트1', 'SCRIPT-VIEWER')
      this.$root.$emit('setDataForWorkspaceTab', 'asdf', 'D:/')
      this.$root.$emit('setDataForWorkspaceTab', 'asdf1', 'D:/test')
    }
  }
</script>

<style lang="scss">
  /* CSS */

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
      background-color: rgba(200, 200, 200, 0.5);
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
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

  input,
  textarea {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
  }

  .ui-resizable-e {
    right: 0;
  }
</style>