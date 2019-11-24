<template>
  <aside>
    <aside-tabs></aside-tabs><!--
    --><aside-section></aside-section>
  </aside>
</template>

<script>
  import AsideTabs from '@/components/AsideTabs/Component'
  import AsideSection from '@/components/AsideSection/Component'

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
    position: relative;
    z-index: 1;
  }
</style>