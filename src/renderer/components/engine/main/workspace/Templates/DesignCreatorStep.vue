<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">
        <span class="caption">클래스 선택</span>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">
        <span class="caption">타입 선택</span>
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-select :items="designs" v-model="selectedClass" item-text="name" return-object label="클래스를 선택하세요">
        </v-select>
        <div class="text-xs-center">
          <v-btn icon @click="step = 2" :disabled="!designClass">
            <v-icon>navigate_next</v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-alert :value="isTypeUseless" type="info" v-if="selectedClass">
          이 클래스는 타입이 {{ designType }} 고정이므로, 지정할 수 없습니다.
        </v-alert>
        <v-select :items="designTypes" v-model="selectedType" item-text="name" return-object label="객체의 타입을 선택하세요"
          v-if="!isTypeUseless"></v-select>
        <div class="text-xs-center">
          <v-btn icon @click="step = 1">
            <v-icon>navigate_before</v-icon>
          </v-btn>
          <v-btn icon @click="createDesign" :disabled="!designType">
            <v-icon>done</v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import electron from 'electron'

  import fs from 'fs-extra'
  import path from 'path'

  import DESIGN_LIST from './js/DESIGN_LIST'
  import DESIGN_TYPE from './js/DESIGN_TYPE'
  import REGEXP from '@/assets/js/REGEXP'

  export default {

    components: {
      Treeview,
    },
    data: () => ({
      step: 0,

      selectedClass: null,
      selectedType: null,
      selectedAsset: null,

      designs: DESIGN_LIST,
      designTypes: DESIGN_TYPE,

      designClass: null,
      designType: null,
      designAssetSrc: null

    }),

    computed: {

      isTypeUseless() {

        if (!this.selectedClass) {
          return false
        }

        return !!this.selectedClass.type

      }

    },

    methods: {

      setBanner(name, image, description) {
        this.$emit('setBanner', name, image, description)
      },

      createDesign() {
        this.$emit('createDesign', this.designClass, this.designType, this.designAssetSrc)
      }

    },

    watch: {

      selectedClass() {

        this.designClass = this.selectedClass.ext
        this.designAssetSrc = null

        if (this.selectedClass.type) {
          this.selectedType = this.designTypes.find(t => t.value === this.selectedClass.type)
        }

        this.$nextTick(() => {
          this.setBanner(this.selectedClass.name, this.selectedClass.image, this.selectedClass.description)
        })

      },

      selectedType() {

        this.designType = this.selectedType.value
        this.designAssetSrc = this.selectedType.src

        this.setBanner(this.selectedType.name, this.selectedType.image, this.selectedType.description)

      }

    }

  }
</script>

<style type="scss" scoped>
</style>