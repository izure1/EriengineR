<template>
  <section class="macro-input-select">
    <v-radio-group v-model="selected">
      <v-radio v-for="(item, index) in getRadioList" :key="index" :label="item.text" :value="item.value" color="success" @change="modalReturn"></v-radio>
    </v-radio-group>
  </section>
</template>

<script>
  export default {

    props: ['variable', 'origin'],
    data: () => ({
      selected: null
    }),

    computed: {

      getRadioList() {
        return this.origin.list
      }

    },

    methods: {

      getMatchedValue() {

        for (let item of this.origin.list) {
          if (item.value === this.variable.value) {
            return item.value
          }
        }

        for (let item of this.origin.list) {
          if (item.text === this.origin.text) {
            return item.value
          }
        }

        return undefined

      },

      modalReturn(value) {
        this.$emit('modalReturn', value)
      }

    },

    created() {
      this.selected = this.getMatchedValue()
    }

  }
</script>

<style lang="scss" scoped>
  .macro-input-select {
    margin: 20px;
  }
</style>