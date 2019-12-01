<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">
        <span class="caption">부모 클래스 선택</span>
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-select :items="designs" v-model="selectedClass" item-text="name" return-object label="부모 클래스를 선택하세요">
        </v-select>
        <div class="text-xs-center">
          <v-btn @click="createDesign" :disabled="!selectedClass">
            <v-icon left>save</v-icon>만들기
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import Treeview from '@/components/Treeview/Component'

  import fs from 'fs-extra'

  import DESIGN_LISTS from '@game/designs/vars/DESIGN_LISTS'
  import REGEXP from '@/assets/js/vars/REGEXP'

  export default {

    components: {
      Treeview,
    },
    data: () => ({
      step: 0,
      selectedClass: null,
      designs: DESIGN_LISTS,
    }),

    methods: {

      setBanner(name, image, description) {
        this.$emit('setBanner', name, image, description)
      },

      createDesign() {
        this.$emit('createDesign', this.selectedClass)
      }

    },

    watch: {

      selectedClass() {

        this.$nextTick(() => {
          this.setBanner(this.selectedClass.name, this.selectedClass.image, this.selectedClass.description)
        })

      }

    }

  }
</script>

<style type="scss" scoped>
</style>