<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'eriengine',
    mounted() {}
  }
</script>

<style lang="scss">
  @import '~semantic-ui-css/semantic.min.css';

  $test: #333;

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
      background-color: rgba(200, 200, 200, 0.5);
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  body {
    color: lightgray;
  }

  a {
    color: inherit;

    &:hover {
      color: inherit;
    }
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
    font-family: 'NanumBarunGothicUltraLight', 돋움, 굴림 !important;
    padding: 0;
    margin: 0;
  }

  input,
  textarea {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    background-color: transparent;

    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, .1);
    }
  }

  .ui-resizable-e {
    right: 0;
  }
</style>