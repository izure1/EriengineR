<template>
  <section id="aside-section">
    <aside-section-home v-show="tabId === 'home'"></aside-section-home>
    <aside-section-asset v-show="tabId === 'asset'"></aside-section-asset>
    <aside-section-design v-show="tabId === 'design'"></aside-section-design>
    <aside-section-scene v-show="tabId === 'scene'"></aside-section-scene>
  </section>
</template>

<script>
  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/resizable'
  import 'jquery-ui/themes/base/core.css'
  import 'jquery-ui/themes/base/resizable.css'

  import AsideSectionHome from '@/components/AsideSectionHome/Component'
  import AsideSectionAsset from '@/components/AsideSectionAsset/Component'
  import AsideSectionDesign from '@/components/AsideSectionDesign/Component'
  import AsideSectionScene from '@/components/AsideSectionScene/Component'

  export default {
    components: {
      AsideSectionHome,
      AsideSectionAsset,
      AsideSectionDesign,
      AsideSectionScene
    },
    data: () => ({
      tabId: 'home'
    }),
    mounted(e) {

      this.$root.$on('showAsideTab', tabId => {
        this.tabId = tabId
      })

      $(document).ready(function () {
        $('#aside-section').resizable({
          handles: 'e',
          minWidth: 2
        })
      })

    }
  }
</script>

<style lang="scss" scoped>
  #aside-section {
    width: 360px;
    background-color: #444;
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    z-index: 2;
  }
</style>