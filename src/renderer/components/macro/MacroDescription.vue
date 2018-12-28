<template>
  <div class="macro-description">
    <macro-description-context v-for="macro in macros" :key="macro.cid" v-if="current === macro" :macro="macro"></macro-description-context>
  </div>
</template>

<script>
  import MacroDescriptionContext from './MacroDescriptionContext'

  export default {
    components: {
      MacroDescriptionContext
    },
    props: {
      macros: Array,
      current: Object,
      path: String
    }
  }
</script>

<style lang="scss" scoped>
  .macro-description {
    padding: 10px 20px;
    background-color: #efefef;
    box-sizing: border-box;
    border-radius: 5px;
  }
</style>

<style lang="scss">
  .macro-description a {
    text-decoration: none;
    margin: 0 5px;
    z-index: 1;
  }
</style>