<template>
  <section class="macro-input">

    <macro-input-text v-if="modalData.type === 'text'" :variable="modalData.variable" :origin="modalData.origin"
      @modalReturn="modalReturn"></macro-input-text>

    <macro-input-value v-else-if="modalData.type === 'value'" :variable="modalData.variable" :origin="modalData.origin"
      @modalReturn="modalReturn"></macro-input-value>

    <macro-input-select v-else-if="modalData.type === 'select'" :variable="modalData.variable" :origin="modalData.origin"
      @modalReturn="modalReturn"></macro-input-select>

    <macro-input-file v-else-if="modalData.type === 'file'" :variable="modalData.variable" :origin="modalData.origin"
      @modalReturn="modalReturn"></macro-input-file>

    <v-divider></v-divider>
    <div class="macro-input-actions">
      <v-btn @click="done">
        <v-icon>save</v-icon>
        저장
      </v-btn>
      <v-btn @click="cancel">
        <v-icon>delete</v-icon>
        취소
      </v-btn>
    </div>
  </section>
</template>

<script>
  import electron from 'electron'

  import MacroInputText from './MacroInputText'
  import MacroInputValue from './MacroInputValue'
  import MacroInputSelect from './MacroInputSelect'
  import MacroInputFile from './MacroInputFile'


  export default {
    components: {
      MacroInputText,
      MacroInputValue,
      MacroInputSelect,
      MacroInputFile
    },

    props: {
      returnValue: null,
      modalData: Object
    },

    data: () => ({
      win: electron.remote.getCurrentWindow()
    }),

    methods: {

      modalReturn(val) {
        this.returnValue = val
      },

      done() {
        this.win.emit('modal-return', this.returnValue)
      },

      cancel() {
        this.win.close()
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