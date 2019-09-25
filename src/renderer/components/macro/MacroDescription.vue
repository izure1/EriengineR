<template>
  <div>
    <v-runtime-template :template="template"></v-runtime-template>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'
  import REGEXP from '@/assets/js/REGEXP'

  export default {

    components: {
      VRuntimeTemplate
    },

    props: {
      select: Object
    },

    data: () => ({
      template: '<div></div>'
    }),

    computed: {

    },

    methods: {

      changeDescription() {
        this.template = this.getParsedHTML()
      },

      isInputed(){

      },

      getInputedText() {

      },

      getDefaultText() {
        return 
      },

      getParsedHTML() {

        let description

        description = this.select.description.replace(REGEXP.variable, (matched, str) => {
          return `<kbd @click="test">${str}</kbd>`
        })

        return `<div>${description}</div>`

      },

      test() {
        console.log(1)
      }

    },

    watch: {

      select() {
        this.changeDescription()
      }

    },

    created() {
      this.changeDescription()
    }

  }
</script>

<style lang="scss" scoped>

</style>