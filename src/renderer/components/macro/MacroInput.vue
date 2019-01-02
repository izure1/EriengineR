<template>
  <section>
    <macro-input-text v-if="type === 'text'"></macro-input-text>
    <macro-input-radio v-if="type === 'radio'"></macro-input-radio>
    <macro-input-file v-if="type === 'file'"></macro-input-file>
  </section>
</template>

<script>
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
        type: this.$route.params.type
      }
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
</style>