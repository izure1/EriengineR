<template>
  <section>
    <v-tabs slider-color="orange" fixed-tabs show-arrows>
      <v-tab v-for="(language, index) in languages" :key="index">{{ language.name }}</v-tab>
      <v-tab-item v-for="(language, index) in languages" :key="index">
        <v-textarea placeholder="내용을 입력하세요. 다국어를 지원하고 싶다면 상단에서 언어를 관리하세요." no-resize full-width clearable
          autofocus style="padding:10px" v-model="languageText[language.id]" @change="modalReturn"></v-textarea>
      </v-tab-item>
      <v-btn icon @click="languageManageMode = true">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-tabs>
    <v-dialog v-model="languageManageMode" fullscreen>
      <v-card>
        <v-card-title>
          <v-toolbar fixed>
            <v-btn icon @click="languageManageMode = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>다국어 관리자</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <language-manager></language-manager>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import electron from 'electron'
  import LanguageManager from '@/components/language-manager/LanguageManager'

  import createUUID from '@static/js/createUUID'


  export default {

    components: {
      LanguageManager
    },

    props: ['variable'],

    data: () => ({
      languages: [],
      languageText: {},
      languageManageMode: false
    }),

    methods: {

      modalReturn() {

        for (let language of this.languages) {

          electron.ipcRenderer.sendSync('language-append')

          this.languageText[language.id]

        }

        this.variable.text = this.languageText
        this.$emit('modalReturn', this.variable)
      },

      getLanguages() {

        return new Promise((resolve, reject) => {

          electron.ipcRenderer.send('language-get')
          electron.ipcRenderer.once('language-get', (e, languages) => {
            resolve(languages)
            this.setValue(languages)
          })

        })

      },

      setValue(languages) {

        electron.ipcRenderer.send('language-find')
        electron.ipcRenderer.once('language-find', (e, text) => {

          for (let p in text) {
            this.languageText[p] = text[p] || this.variable.text || ''
          }

        })

      }

    },

    async created() {

      this.languages = await this.getLanguages()

      electron.ipcRenderer.on('language-update', async () => {
        this.languages = await this.getLanguages()
      })

    }
  }
</script>

<style lang="scss" scoped>
</style>