<template>
  <aside>
    <aside-tabs></aside-tabs><!--
    --><aside-section></aside-section>
  </aside>
</template>

<script>
  import AsideTabs from './AsideTabs'
  import AsideSection from './AsideSection'

  export default {
    components: {
      AsideTabs,
      AsideSection
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    height: 100%;
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 1;
  }
</style>