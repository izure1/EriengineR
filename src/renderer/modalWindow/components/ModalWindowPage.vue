<template>
  <component :is="getComponent" :modalData="modalData" />
</template>

<script>
  export default {

    props: {

      component: {
        type: String,
        required: true
      },

      modalData: Object

    },

    computed: {

      getComponent() {

        let component

        component = this.component.split('/')

        if (component[0] === '') {
          component.shift()
        }

        component = require('@/' + component.join('/'))
        component = component.default

        return component

      }

    }

  }
</script>