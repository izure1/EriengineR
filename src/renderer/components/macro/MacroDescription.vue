<template>
  <section class="macro-description">
    <macro-description-context v-for="item in macros" :key="item.id" v-if="macro.id === item.id" :macro="macro" :current="current"></macro-description-context>
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
      macro: Object,
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