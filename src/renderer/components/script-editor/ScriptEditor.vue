<template>
  <div>test</div>
</template>

<script>
  import {
    ipcRenderer
  } from 'electron'

  ipcRenderer.on('var-get', function(e, msg) {

    console.log(msg)

  })

  ipcRenderer.send('var-get')

  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
</style>