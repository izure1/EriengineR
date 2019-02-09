<template>
  <section id="main">
    <Aside></Aside>
    <Main></Main>
  </section>
</template>

<script>
  import electron from 'electron'

  import Aside from './aside/Aside'
  import Main from './main/Main'

  export default {
    components: {
      Aside,
      Main
    },
    methods: {
      enableMenu() {
        electron.remote.getCurrentWindow().emit('menu-enable')
      }
    },
    mounted() {
      this.enableMenu()
    }
  }
</script>

<style lang="scss" scoped>
  #main {
    height: 100%;
    overflow: hidden;
    background-color: #e7e7e7;
    display: flex;

    * {
      &:not(textarea):not(input) {
        user-select: none;
      }
    }
  }
</style>