<template>
  <section class="macro-input">
    <macro-input-text v-if="type === 'text'" :value="value"></macro-input-text>
    <macro-input-radio v-if="type === 'radio'" :value="value"></macro-input-radio>
    <macro-input-file v-if="type === 'file'" :value="value"></macro-input-file>
    <v-divider dark></v-divider>
    <div class="macro-input-actions">
      <v-btn dark @click="done">
        <v-icon>save</v-icon>
        저장
      </v-btn>
      <v-btn dark @click="cancel">
        <v-icon>delete</v-icon>
        취소
      </v-btn>
    </div>
  </section>
</template>

<script>
  import electron from 'electron'

  import MacroInputText from './MacroInputText'
  import MacroInputRadio from './MacroInputRadio'
  import MacroInputFile from './MacroInputFile'


  export default {
    components: {
      MacroInputText,
      MacroInputRadio,
      MacroInputFile
    },
    data() {
      return {
        type: this.$route.params.type,
        value: {}
      }
    },
    methods: {

      done() {

        let browser = electron.remote.getCurrentWindow()

        browser.emit('macro-input-done', this.value)
        browser.close()

      },

      cancel() {
        electron.remote.getCurrentWindow().close()
      }

    }
  }
</script>

<style lang="scss" scoped>
  .macro-input {
    height: 100%;
    background-color: #555;
  }

  .macro-input-actions {
    text-align: right;
    padding: 10px 20px;
  }
</style>