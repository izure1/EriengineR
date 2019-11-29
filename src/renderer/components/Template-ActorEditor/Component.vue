<template>
  <section class="template-actordesign">
    <v-card v-for="(information, property) in actor" :key="property" v-show="!isExclude(property)" tile flat
      :loading="updating" :disabled="!getPropertyDetail(property, 'writable')" class="my-2">
      <v-card-title class="body-1 pb-1">{{ getPropertyDetail(property, 'title') }}</v-card-title>
      <v-card-text>
        <p class="caption grey--text" v-html="getPropertyDetail(property, 'description')"></p>
        <div v-if="isTypeofObject(information)">
          <v-form>
            <div v-for="(value, prop) in getValidProperties(property)" :key="prop">
              <v-text-field flat placeholder="값을 입력하세요" :value="value" :label="prop" persistent-hint
                @change="setProperty(information, prop, $event)"></v-text-field>
            </div>
          </v-form>
          <div v-if="getPropertyDetail(property, 'configurable')">
            <v-divider></v-divider>
            <v-list-item two-line @click="addProperty(information)">
              <v-list-item-icon>
                <v-icon>add</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>추가하기</v-list-item-title>
                <v-list-item-subtitle class="caption grey--text">새로운 속성을 만듭니다</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div v-else class="actordesign-input-single">
          <v-text-field placeholder="값을 입력하세요" flat :value="information" @change="setProperty(actor, property, $event)">
          </v-text-field>
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
  import fs from 'fs-extra'

  import Actor from '@common/js/Actor'
  import PROPERTIES from './vars/PROPERTIES'

  import isActorReady from './computed/isActorReady'

  import readFromFile from './methods/readFromFile'
  import saveFile from './methods/saveFile'
  import getInformation from './methods/getInformation'
  import isExclude from './methods/isExclude'
  import getPropertyDetail from './methods/getPropertyDetail'
  import isTypeofObject from './methods/isTypeofObject'
  import addProperty from './methods/addProperty'
  import setProperty from './methods/setProperty'
  import deleteProperty from './methods/deleteProperty'
  import getValidProperties from './methods/getValidProperties'

  import watchFile from './methods/watchFile'
  import unwatchFile from './methods/unwatchFile'
  import onFileUpdate from './methods/onFileUpdate'

  import watchPath from './watch/path'


  export default {

    props: ['data'],
    data: () => ({
      path: null,
      actor: null,
      updating: false
    }),

    computed: {
      isActorReady
    },

    methods: {
      readFromFile,
      saveFile,
      getInformation,
      isExclude,
      getPropertyDetail,
      isTypeofObject,
      addProperty,
      setProperty,
      deleteProperty,
      watchFile,
      unwatchFile,
      onFileUpdate,
      getValidProperties,
    },

    created() {

      this.path = this.data + ''
      this.watchFile()

    },

    watch: {
      path: watchPath,
    },

    beforeDestroy() {
      this.unwatchFile()
    }

  }
</script>

<style lang="scss" scoped>
  .actordesign-input-single {
    margin-top: -15px;
  }
</style>