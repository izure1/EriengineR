<template>
  <main>
    <Workspace></Workspace>
    <Terminal></Terminal>
  </main>
</template>

<script>
  import Workspace from './workspace/Workspace'
  import Terminal from './terminal/Terminal'

  export default {
    components: {
      Workspace,
      Terminal
    }
  }
</script>

<style lang="scss" scoped>
  main {
    width: 100%;
    height: 100%;
    background-color: #eee;
    position: relative;
    z-index: 0;
  }
</style>