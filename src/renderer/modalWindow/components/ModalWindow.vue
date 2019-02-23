<template>
  <modal-window-page :component="component" :modalData="data"></modal-window-page>
</template>


<script>
  import electron from 'electron'
  import path from 'path'

  import ModalWindowPage from './ModalWindowPage'
  import Empty from './Empty'


  export default {

    components: {
      ModalWindowPage
    },

    data: () => ({
      win: null,
      data: {},
      component: 'modalWindow/components/Empty'
    }),

    created() {

      this.win = electron.remote.getCurrentWindow()

      this.win.on('modal-set-data', this.receivedData.bind(this))
      this.win.emit('modal-ready')

    },

    methods: {

      receivedData(component, data) {
        this.component = component
        this.data = data
      }

    }

  }
</script>

<style lang="scss" scoped>
</style>