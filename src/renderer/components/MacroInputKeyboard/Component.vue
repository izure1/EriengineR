<template>
  <v-card flat>
    <v-card-text v-if="!value" class="text-center">
      <img src="@/assets/img/ico_loading.svg">
      <p class="caption">{{ tab.hint }}</p>
    </v-card-text>
    <v-card-text v-else class="text-center">
      <p class="caption">당신이 입력한 값은</p>
      <p class="display-4 font-weight-thin mb-5">{{ getKeyname }}</p>
      <v-btn icon @click="value = null">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import keycode from 'keycode'

  export default {

    props: {
      tab: Object
    },

    computed: {

      getKeyname() {
        return keycode(this.value)
      }

    },

    data: () => ({
      value: null
    }),

    methods: {

      isHidden() {
        return this.$el.offsetParent === null
      },

      inputKey(e) {

        if (this.isHidden()) {
          return
        }

        this.value = e.keyCode

      }

    },

    created() {
      this.value = this.tab.value
    },

    mounted() {
      window.addEventListener('keydown', this.inputKey)
    },

    destroyed() {
      window.removeEventListener('keydown', this.inputKey)
    },

    watch: {

      value() {
        this.$emit('change', this.tab.name, this.value)
      }

    }

  }
</script>