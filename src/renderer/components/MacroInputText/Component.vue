<template>
  <v-textarea no-resize filled clearable clear-icon="clear" label="값을 입력하세요" :hint="tab.hint" v-model="value">
  </v-textarea>
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

      value(){
        this.$emit('change', this.tab.name, this.value)
      }

    }

  }
</script>