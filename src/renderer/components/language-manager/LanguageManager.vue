<template>
  <section>
    <v-list two-line subheader dark>
      <v-list-tile v-for="(language, index) in languages" :key="index">
        <v-list-tile-avatar>
          <v-icon>language</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <p v-if="languageModify !== language">{{ language }}</p>
            <input :value="language" v-else @blur="modifyLanguage($event, language)" @keydown.enter="modifyLanguage($event, language)"
              @keydown.esc="languageModify = null">
          </v-list-tile-title>
          <v-list-tile-sub-title>{{ language }}를 관리합니다</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon title="이름을 수정합니다" @click="modifyLanguageConfirm(language)">
            <v-icon small>settings</v-icon>
          </v-btn>
          <v-btn icon title="해당 언어를 삭제합니다" @click="removeLanguageConfirm(language)">
            <v-icon small>delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="addLanguage" style="cursor:pointer">
        <v-list-tile-avatar>
          <v-icon>add</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>새로운 언어 추가</v-list-tile-title>
          <v-list-tile-sub-title>새로운 언어를 추가합니다</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog dark fullscreen v-model="languageRemove.dialog">
      <v-card>
        <v-card-title>{{ languageRemove.language }} 삭제</v-card-title>
        <v-card-text>정말로 {{ languageRemove.language }}(를)을 삭제하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="languageRemove.dialog = false">
            <v-icon>cancel</v-icon>
            아니오
          </v-btn>
          <v-btn color="warning" @click="removeLanguage">
            <v-icon>delete</v-icon>
            삭제합니다
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import electron from 'electron'
  import createItem from '@static/js/createItem'


  export default {
    data() {
      return {
        languages: [],
        languageModify: null,
        languageRemove: {
          dialog: false,
          language: null
        }
      }
    },
    methods: {

      async addLanguage() {

        let languages, language

        languages = await this.updateList()
        language = createItem(this.languages, '새로운 언어')

        electron.ipcRenderer.send('language-add', language)
        electron.ipcRenderer.once('language-add', async () => {
          this.languages = await this.updateList()
        })

      },

      removeLanguageConfirm(language) {
        this.languageRemove.dialog = true
        this.languageRemove.language = language
      },

      removeLanguage() {

        electron.ipcRenderer.send('language-remove', this.languageRemove.language)
        electron.ipcRenderer.once('language-remove', async () => {
          this.languageRemove.dialog = false
          this.languages = await this.updateList()
        })

      },

      modifyLanguage(e, origin) {

        electron.ipcRenderer.send('language-modify', origin, e.currentTarget.value)
        electron.ipcRenderer.once('language-modify', async (e, result) => {
          this.languages = await this.updateList()
        })

        this.languageModify = null

      },

      modifyLanguageConfirm(language) {
        this.languageModify = language
      },

      updateList() {

        return new Promise((resolve, reject) => {

          electron.ipcRenderer.send('language-get')
          electron.ipcRenderer.once('language-get', (e, languages) => resolve(languages))

        })

      }

    },
    async created() {

      this.languages = await this.updateList()

    },

    mounted() {

      electron.ipcRenderer.on('language-update', async () => {

        this.languages = await this.updateList()

      })

    }
  }
</script>

<style lang="scss" scoped>
  input {
    color: orange;
  }
</style>