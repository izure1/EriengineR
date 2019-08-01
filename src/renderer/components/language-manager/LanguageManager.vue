<template>
  <section>
    <v-list subheader>
      <v-list-item two-line v-for="(language, index) in languages" :key="index" @click="setDefaultLanguage(language.id)">
        <v-list-item-avatar>
          <v-icon color="orange" v-if="isDefaultLanguage(language.id)">check_box</v-icon>
          <v-icon color="white" v-else>check_box_outline_blank</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <span v-if="languageModify !== language.id">{{ language.name }}</span>
            <input :value="language.name" v-else @blur="modifyLanguage($event, language.name)" @keydown.enter="modifyLanguage($event, language.name)"
              @keydown.esc="languageModify = null" @click.stop>
          </v-list-item-title>
          <v-list-item-sub-title>
            <span v-if="isDefaultLanguage(language.id)">현재 선택된 기본언어입니다</span>
            <span v-else>클릭하면 {{ language.name }}를(을) 기본언어로 지정합니다</span>
          </v-list-item-sub-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn x-small icon title="이름을 수정합니다" @click.stop="modifyLanguageConfirm(language.id)">
            <v-icon>settings</v-icon>
          </v-btn>
          <v-btn x-small icon title="해당 언어를 삭제합니다" @click.stop="removeLanguageConfirm(language.name)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item two-line @click="addLanguage" style="cursor:pointer">
        <v-list-item-avatar>
          <v-icon>add</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>새로운 언어 추가</v-list-item-title>
          <v-list-item-sub-title>새로운 언어를 추가합니다</v-list-item-sub-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="languageRemove.dialog">
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
    data: () => ({
      languages: [],
      languageDefault: null,
      languageModify: null,
      languageRemove: {
        dialog: false,
        language: null
      }
    }),
    methods: {

      setDefaultLanguage(id) {
        ipcRenderer.sendSync('language-set-default', id)
      },

      isDefaultLanguage(id) {
        return id === this.languageDefault
      },

      addLanguage() {

        let name

        name = createItem(this.languages.map(language => language.name), '새로운 언어')

        ipcRenderer.sendSync('language-add', name)

      },

      removeLanguageConfirm(name) {
        this.languageRemove.dialog = true
        this.languageRemove.language = name
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

      modifyLanguageConfirm(id) {
        this.languageModify = id
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