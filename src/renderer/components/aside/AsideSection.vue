<template>
  <section id="aside-section">
    <aside-section-home v-if="checkSelectThisTab == 'home'"></aside-section-home>
    <aside-section-asset v-if="checkSelectThisTab == 'asset'"></aside-section-asset>
    <aside-section-design v-if="checkSelectThisTab == 'design'"></aside-section-design>
    <aside-section-interface v-if="checkSelectThisTab == 'interface'"></aside-section-interface>
    <aside-section-script v-if="checkSelectThisTab == 'script'"></aside-section-script>
  </section>
</template>

<script>
  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/resizable'
  import 'jquery-ui/themes/base/core.css'
  import 'jquery-ui/themes/base/resizable.css'

  import AsideSectionHome from './tabs/AsideSectionHome'
  import AsideSectionAsset from './tabs/AsideSectionAsset'
  import AsideSectionDesign from './tabs/AsideSectionDesign'
  import AsideSectionInterface from './tabs/AsideSectionInterface'
  import AsideSectionScript from './tabs/AsideSectionScript'

  export default {
    components: {
      AsideSectionHome,
      AsideSectionAsset,
      AsideSectionDesign,
      AsideSectionInterface,
      AsideSectionScript
    },
    computed: {
      checkSelectThisTab () {
        return this.$store.state.Aside.tabId
      }
    },
    created (e) {
      $(document).ready(function () {
        $('#aside-section').resizable({
          handles: 'e',
          minWidth: 0
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  #aside-section {
    width: 260px;
    height: 100%;
    background-color: white;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
</style>