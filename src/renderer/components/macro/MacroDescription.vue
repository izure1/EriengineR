<template>
  <section class="macro-description">
    <macro-description-context v-for="macro in macros" :key="macro.cid" v-if="current.cid === macro.cid" :macro="macro"
      :current="current"></macro-description-context>
  </section>
</template>

<script>
  import MacroDescriptionContext from './MacroDescriptionContext'

  export default {
    components: {
      MacroDescriptionContext
    },
    props: {
      macros: Array,
      variables: Object,
      current: Object,
      path: String
    }
  }
</script>

<style lang="scss" scoped>
  .macro-description {
    padding: 20px;
  }
</style>