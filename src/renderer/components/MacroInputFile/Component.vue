<template>
  <div>
    <treeview :path="getRootDir" :filter="getFilter" :openItem="getFilePath" v-if="!value"></treeview>
    <v-textarea v-else no-resize filled clearable clear-icon="clear" label="값을 입력하세요" :hint="tab.hint" v-model="value">
    </v-textarea>
    <v-divider></v-divider>
  </div>
</template>

<script>
  import Treeview from '@/components/Treeview/Component'
  import path from 'path'

  import {
    ipcRenderer
  } from 'electron'


  export default {

    components: {
      Treeview
    },

    props: {
      tab: Object
    },

    data: () => ({
      value: null
    }),

    computed: {

      getRootDir() {
        return ipcRenderer.sendSync('project-get-directory')
      },

      getFilter() {

        let extensions
        let opt

        extensions = this.tab.lists || []
        opt = {
          extensions: null
        }

        extensions = extensions.map(t => `(\\${t})`).join('|')
        extensions = extensions + '$'

        opt.extensions = new RegExp(extensions, 'g')

        return opt

      }

    },

    methods: {

      getRelativeFilePath(itempath) {

        let rootDir
        let relPath

        rootDir = ipcRenderer.sendSync('project-get-directory')

        relPath = itempath.replace(rootDir, '')
        relPath = relPath.split('/').filter(t => !!t).join('/')

        return relPath

      },

      getFilePath(itempath) {
        this.value = this.getRelativeFilePath(itempath)
      }

    },

    created() {
      this.value = this.tab.value
    },

    watch: {

      value() {
        this.$emit('change', this.tab.name, this.value)
      }

    }

  }
</script>