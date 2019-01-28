<template>
  <section>
    <v-tabs dark slider-color="orange" fixed-tabs show-arrows="">
      <v-tab v-for="(language, index) in languages" :key="index">{{ language }}</v-tab>
      <v-tab-item v-for="(language, index) in languages" :key="index">
        <v-textarea dark placeholder="내용을 입력하세요. 다국어를 지원하고 싶다면 상단에서 언어를 관리하세요." no-resize full-width clearable
          autofocus style="padding:10px"></v-textarea>
      </v-tab-item>
      <v-btn dark icon @click="languageManageMode = true">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-tabs>
    <v-dialog v-model="languageManageMode" dark fullscreen>
      <v-card>
        <v-toolbar dark>
          <v-btn icon @click="languageManageMode = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>다국어 관리자</v-toolbar-title>
        </v-toolbar>
        <language-manager></language-manager>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import electron from 'electron'
  import LanguageManager from '@/components/language-manager/LanguageManager'


  export default {
    components: {
      LanguageManager
    },
    data() {
      return {
        languages: [],
        languageManageMode: false
      }
    },
    created() {

      electron.ipcRenderer.send('language-get')
      electron.ipcRenderer.once('language-get', (e, languages) => {
        this.languages = languages
      })

    }
  }
</script>

<style lang="scss" scoped>
</style>