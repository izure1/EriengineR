<template>
  <section class="macro-description">
    <macro-description-context v-for="macro in macros" :key="macro.cid" v-if="selected.cid === macro.cid" :macro="macro" :current="current"></macro-description-context>
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
      current: Object,
      selected: Object,
      path: String
    }
  }
</script>