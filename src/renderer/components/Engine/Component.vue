<template>
  <section id="main">
    <Aside></Aside>
    <Main></Main>
  </section>
</template>

<script>
  import {
    remote
  } from 'electron'

  import Aside from '@/components/Aside/Component'
  import Main from '@/components/Main/Component'
  

  export default {
    components: {
      Aside,
      Main
    },

    mounted() {
      remote.getCurrentWindow().emit('menu-enable')
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