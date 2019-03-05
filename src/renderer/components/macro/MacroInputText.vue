<template>
  <section class="macro-input-text">
    <v-tabs slider-color="orange" fixed-tabs show-arrows>
      <v-tab v-for="(language, index) in languages" :key="index">{{ language.name }}</v-tab>
      <v-tab-item v-for="(language, index) in languages" :key="index">
        <v-textarea placeholder="내용을 입력하세요. 다국어를 지원하고 싶다면 상단에서 언어를 관리하세요." no-resize full-width clearable autofocus
          style="padding:10px" v-model="inputText[language.id]" @change="modalReturn"></v-textarea>
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
      inputText: {},
      languageManageMode: false
    }),

    methods: {

      async modalReturn() {

        // 사용자가 입력한 모든 텍스트를 다국어 파일에 삽입합니다
        for (let language of this.languages) {
          await electron.ipcRenderer.send('language-append', language.name, this.inputText[language.id], this.variable.id)
        }

        this.$emit('modalReturn', this.variable.id)

      },

      getLanguages() {

        return new Promise((resolve, reject) => {

          electron.ipcRenderer.send('language-get')
          electron.ipcRenderer.once('language-get', (e, languages) => {
            resolve(languages)
            this.setSavedText(languages)
          })

        })

      },

      setSavedText(languages) {

        electron.ipcRenderer.send('language-find', this.variable.value)
        electron.ipcRenderer.once('language-find', (e, text) => {

          for (let language of languages) {
            this.$set(this.inputText, language.id, text[language.id])
          }

          this.modalReturn()

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