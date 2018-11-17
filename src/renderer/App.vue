<template>
  <div id="app">
    <Aside></Aside>
    <Main></Main>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Lve from 'lve'

  import Aside from './components/aside/Aside'
  import Main from './components/main/Main'
  import {
    setTimeout
  } from 'timers';

  export default {
    name: 'eriengine',
    components: {
      Aside,
      Main
    },
    mounted() {
      let a = this
      this.$root.$emit('createWorkspaceTab', '테스트', 'asdf', 'SCRIPT-VIEWER', {})
      this.$root.$emit('createWorkspaceTab', '테스트', 'asdf1', 'SCRIPT-EDITOR', {})
      this.$root.$emit('setDataForWorkspaceTab', 'asdf1', {
        events: [{
          text: '으아아악 시발'
        }],
        conditions: [],
        actions: [
          '시바르아앙',
          '시바르아앙',
          '시바르아앙',
          '시바르아앙',
          '시바르아앙',
          '시바르아앙',
          '시바르아앙',
        ]
      })
      this.$root.$emit('setDataForWorkspaceTab', 'asdf', {
        test: 1
      })
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
    overflow: hidden;
    background-color: #e7e7e7;

    * {
      &:not(textarea):not(input) {
        user-select: none;
      }
    }
  }

  #app {
    display: flex;
  }
</style>