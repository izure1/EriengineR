<template>
  <section class="macro-input-text">
    <v-tabs fixed-tabs show-arrows prev-icon="chevron_left" next-icon="chevron_right" v-model="tab">
      <v-tabs-slider color="orange"></v-tabs-slider>
      <v-tab v-for="(language, index) in languages" :key="index">{{ language.name }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="macro-input-place">
      <v-tab-item v-for="(language, index) in languages" :key="index">
        <v-textarea placeholder="내용을 입력하세요. 다국어를 지원하고 싶다면 상단에서 언어를 관리하세요." no-resize full-width clearable autofocus
          style="padding:10px" v-model="inputText[language.id]" @change="modalReturn"></v-textarea>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
  import electron from 'electron'
  import LanguageManager from '@/components/language-manager/LanguageManager'

  import createUUID from '@common/js/createUUID'


  function isUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)
  }


  export default {

    components: {
      LanguageManager
    },

    props: ['variable'],

    data: () => ({
      tab: null,
      languages: [],
      inputText: {}
    }),

    methods: {

      async modalReturn() {

        // 사용자가 입력한 모든 텍스트를 다국어 파일에 삽입합니다
        for (let language of this.languages) {
          await electron.ipcRenderer.send('language-append', language.name, this.inputText[language.id], this.variable
            .id)
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

<style lang="scss" scoped>
  .macro-input-place {
    background-color: transparent !important;
  }
</style>