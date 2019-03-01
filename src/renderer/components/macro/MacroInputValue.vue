<template>
  <v-textarea placeholder="값을 입력하세요" no-resize full-width clearable autofocus style="padding:10px"
    v-model="value" @change="modalReturn"></v-textarea>
</template>

<script>
  export default {

    props: ['variable'],
    data: () => ({
      value: undefined
    }),

    methods: {

      modalReturn() {
        this.$emit('modalReturn', this.value)
      }

    }

  }
</script>

<style lang="scss" scoped>
</style>