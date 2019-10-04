<template>
  <div class="pa-5">
    <v-radio-group v-model="value">
      <v-radio v-for="list in tab.lists" :key="list.text" :value="list.value" :label="list.text"></v-radio>
    </v-radio-group>
    <p class="caption grey--text text--lighten-1">{{ tab.hint }}</p>
  </div>
</template>

<script>
  export default {

    props: {
      tab: Object
    },

    data: () => ({
      value: null
    }),

    created() {
      this.value = this.tab.value
    },

    watch: {

      value() {
        this.$emit('change', this.tab.name, this.value)
      }

    }

  }
</script>