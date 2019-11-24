<template>
  <main>
    <Workspace></Workspace>
    <Terminal></Terminal>
  </main>
</template>

<script>
  import Workspace from '@/components/Workspace/Component'
  import Terminal from '@/components/Terminal/Component'

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
    background-color: #333;
    position: relative;
    z-index: 0;
  }
</style>