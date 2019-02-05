<template>
  <section>
    <v-list two-line subheader dark>
      <v-list-tile v-for="(language, index) in languages" :key="index" @click="setDefaultLanguage(language)">
        <v-list-tile-avatar>
          <v-icon color="orange" v-if="isDefaultLanguage(language)">check_box</v-icon>
          <v-icon color="white" v-else>check_box_outline_blank</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <p v-if="languageModify !== language">{{ language }}</p>
            <input :value="language" v-else @blur="modifyLanguage($event, language)" @keydown.enter="modifyLanguage($event, language)"
              @keydown.esc="languageModify = null" @click.stop>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <span v-if="isDefaultLanguage(language)">현재 선택된 기본언어입니다</span>
            <span v-else>클릭하면 {{ language }}를(을) 기본언어로 지정합니다</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon title="이름을 수정합니다" @click.stop="modifyLanguageConfirm(language)">
            <v-icon small>settings</v-icon>
          </v-btn>
          <v-btn icon title="해당 언어를 삭제합니다" @click.stop="removeLanguageConfirm(language)">
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
        <v-card-title>{{ languageRemove.language }} 제거</v-card-title>
        <v-card-text>
          <p>
            정말로 <b>{{ languageRemove.language }}</b>(를)을 제거하시겠습니까?
            <br>
            이전에 작성한 모든 스크립트에서 해당 언어는 영구히 제거됩니다.
          </p>
          <p>
            이 작업은 복구할 수 없습니다.
          </p>
        </v-card-text>
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
  import {
    ipcRenderer
  } from 'electron'
  import createItem from '@static/js/createItem'

  export default {
    data() {
      return {
        languages: [],
        languageDefault: null,
        languageModify: null,
        languageRemove: {
          dialog: false,
          language: null
        }
      }
    },
    methods: {

      setDefaultLanguage(language) {
        ipcRenderer.sendSync('language-set-default', language)
      },

      isDefaultLanguage(language) {
        return language === this.languageDefault
      },

      addLanguage() {

        let name

        name = createItem(this.languages, '새로운 언어')

        ipcRenderer.sendSync('language-add', name)

      },

      removeLanguageConfirm(language) {
        this.languageRemove.dialog = true
        this.languageRemove.language = language
      },

      removeLanguage() {

        ipcRenderer.sendSync('language-remove', this.languageRemove.language)

        this.languageRemove.dialog = false
        this.languageRemove.language = null

      },

      modifyLanguage(e, origin) {

        ipcRenderer.sendSync('language-modify', origin, e.currentTarget.value)

        this.languageModify = null

      },

      modifyLanguageConfirm(language) {
        this.languageModify = language
      },

    },

    created() {

      this.languages = ipcRenderer.sendSync('language-get')
      this.languageDefault = ipcRenderer.sendSync('language-get-default')

      ipcRenderer.on('language-update', () => {

        this.languages = ipcRenderer.sendSync('language-get')
        this.languageDefault = ipcRenderer.sendSync('language-get-default')

      })

    }
  }
</script>

<style lang="scss" scoped>
  .v-list {
    background-color: transparent !important;
  }

  input {
    color: orange;
  }
</style>