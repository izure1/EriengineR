<template>
  <sui-segment class="macro-description">
    <macro-description-context v-for="macro in macros" :key="macro.cid" v-if="selected.cid === macro.cid" :macro="macro" :current="current"></macro-description-context>
  </sui-segment>
  <!-- <div class="macro-description">
    
  </div> -->
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
      selected: Object,
      path: String
    }
  }
</script>

<style lang="scss">
  .macro-description a {
    text-decoration: none;
    margin: 0 5px;
    z-index: 1;
  }
</style>