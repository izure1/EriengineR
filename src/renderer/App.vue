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
      this.$root.$emit('createWorkspaceTab', '테스트', 'asdf', 'SCRIPT-VIEWER', {})
      this.$root.$emit('setDataForWorkspaceTab', 'asdf', [{
          id: 'asdf1',
          events: [],
          conditions: [],
          actions: []
        },
        {
          id: 'asdf2',
          events: [],
          conditions: [],
          actions: []
        }
      ])
    }
  }
</script>

<style lang="scss">
  /* CSS */

  @font-face {
    font-family: 'NanumBarunGothicUltraLight';
    src: url('~@/assets/fonts/NanumBarunGothicUltraLight.woff');
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
</style>