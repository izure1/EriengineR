<template>
  <section class="macro-input-file">
    <treeview :path="path" :filter="getFilter" :configurable="false" :openItem="selectFile" v-if="!file"></treeview>
    <v-card v-else>
      <v-card-title>파일 선택됨</v-card-title>
      <v-card-text>
        <a href="#" @click="openFile">{{ file }}</a>
        <v-btn icon small @click="reset">
          <v-icon>cancel</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'
  import electron from 'electron'

  import Treeview from '@/components/treeview/Treeview'


  export default {

    components: {
      Treeview
    },

    props: ['variable', 'origin'],
    data: () => ({

      path: electron.ipcRenderer.sendSync('asset-get-directory'),
      file: null,
      extensions: []

    }),

    computed: {

      contextmenu() {
        return []
      },

      getFilter() {
        
        let pattern
        let regexp

        pattern = this.extensions.map(ext => `(\\${ext})$`)
        pattern = pattern.join('|')

        regexp = new RegExp(pattern, 'gmi')

        return {
          extensions: regexp
        }

      }

    },

    methods: {

      selectFile(asset) {

        this.file = this.getRelativePath(asset)
        this.$emit('modalReturn', this.file)

      },

      getRelativePath(asset) {
        return electron.ipcRenderer.sendSync('asset-get-path', asset)
      },

      getAbsolutePath(asset) {
        return electron.ipcRenderer.sendSync('asset-get-path-full', asset)
      },

      openFile() {
        electron.shell.openItem(this.getAbsolutePath(this.file))
      },

      reset() {
        this.file = null
      }

    },

    created() {
      this.extensions = this.origin.list
    }

  }
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    transition: color .15s linear;

    &:hover {
      color: lightgreen !important;
    }
  }
</style>