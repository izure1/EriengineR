<template>
  <section class="macro-input-value">
    <v-textarea placeholder="값을 입력하세요" no-resize full-width clearable autofocus style="padding:10px" v-model="value"
      @change="modalReturn"></v-textarea>
  </section>
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

    },

    created() {
      this.value = this.variable.value
      this.modalReturn()
    }

  }
</script>