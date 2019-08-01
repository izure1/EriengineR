<template>
  <section class="macro-input-file">
    <treeview :path="path" :filter="getFilter" :configurable="false" :openItem="selectFile" v-if="!file"></treeview>
    <v-card v-else>
      <v-card-title>파일 선택됨</v-card-title>
      <v-card-text>
        <a href="#" @click="openFile">{{ fileFakePath }}</a>
        <v-btn icon @click="reset">
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
      fileFakePath: null,
      fileRealPath: null,
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

      async selectFile(filepath) {

        this.file = await this.getAssetData(filepath)
        this.fileFakePath = await this.getFakePath(this.file.id, true)
        this.fileRealPath = await this.getRealPath(this.file)

        this.$emit('modalReturn', this.file.id)

      },

      async getAssetData(asset) {
        return await fs.readJSON(asset)
      },

      async getFakePath(id, relative) {

        return new Promise((resolve, reject) => {

          electron.ipcRenderer.send('asset-get-path', id, relative)
          electron.ipcRenderer.once('asset-get-path', (e, fakePath) => {
            resolve(fakePath)
          })

        })
      },

      async getRealPath(file) {

        let real

        real = electron.ipcRenderer.sendSync('asset-get-directory', true)
        real = path.posix.join(real, file.id + file.ext)

        return real

      },

      async openFile() {
        electron.shell.openItem(this.fileRealPath)
      },

      reset() {
        this.file = null
        this.fileFakePath = null
        this.fileRealPath = null
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