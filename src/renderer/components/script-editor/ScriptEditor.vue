<template>
  <div>test</div>
</template>

<script>
  import {
    ipcRenderer
  } from 'electron'

  ipcRenderer.on('setting-get', function(e, msg) {

    console.log(msg)

  })

  ipcRenderer.send('setting-get')

  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
</style>