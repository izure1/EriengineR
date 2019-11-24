<template>
  <section id="workspace">
    <workspace-tabs></workspace-tabs>
    <workspace-contents></workspace-contents>
  </section>
</template>

<script>
  import init from './js/init'

  import WorkspaceTabs from '@/components/WorkspaceTabs/Component'
  import WorkspaceContents from '@/components/WorkspaceContents/Component'

  export default {
    components: {
      WorkspaceTabs,
      WorkspaceContents
    },
    mounted() {
      init()
    }
  }
</script>

<style lang="scss" scoped>
  #workspace {
    height: calc(100% - 150px);
    display: flex;
    flex-direction: column;
  }
</style>