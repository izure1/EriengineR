<template>
  <section>
    <treeview :path="path" :filter="filter" :configurable="false" :openItem="selectFile" v-if="!fakePath"></treeview>
    <v-card v-else>
      <v-card-title>파일 선택됨</v-card-title>
      <v-card-text>{{ fakePath }}</v-card-text>
    </v-card>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'
  import electron from 'electron'

  import Treeview from '@/components/treeview/Treeview'


  const ipcRenderer = electron.ipcRenderer


  export default {

    components: {
      Treeview
    },

    props: ['variable'],
    data: () => ({

      path: ipcRenderer.sendSync('asset-get-path'),
      fakePath: null,
      filter: {
        extensions: /\.png$/
      }

    }),

    computed: {

      contextmenu() {
        return []
      }

    },

    methods: {

      async selectFile(filepath) {

        let file
        let id

        file = await this.getAssetData(filepath)
        id = file.id
        file = await this.getFakePath(id)

        this.fakePath = file
        this.$emit('modalReturn', id)

      },

      async getAssetData(asset) {
        return await fs.readJSON(asset)
      },

      async getFakePath(id) {

        return new Promise((resolve, reject) => {

          ipcRenderer.send('asset-get-file', id, true)
          ipcRenderer.once('asset-get-file', (e, fakePath) => {
            resolve(fakePath)
          })

        })
      }

    }

  }
</script>

<style lang="scss" scoped>
</style>