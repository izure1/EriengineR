<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :contextmenu="contextmenu" :configurable="true"></treeview>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'fs-extra'

  import {
    ipcRenderer,
    shell
  } from 'electron'

  import CONTEXTMENU from '../vars/CONTEXTMENU'


  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: path.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Designs'),
      filter: {
        extensions: /\.esdesign/
      }
    }),
    computed: {

      contextmenu() {
        return new CONTEXTMENU
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>