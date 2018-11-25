<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :configurable="true"></treeview>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'graceful-fs'

  import {
    ipcRenderer,
    shell
  } from 'electron'

  export default {
    components: {
      Treeview
    },
    data() {
      return {
        path: 'D:\\asdf',
        filter: {
          extensions: /\.esd/,
          exclude: /node_modules/
        },
        openItem(p) {
          shell.openExternal(p)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>