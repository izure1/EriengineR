<template>
  <section class="template-designcreator">
    <h1>생성할 디자인 종류</h1>
    <p>
      디자인이란, 게임에서 보여줄 어떤 물체의 공통된 특징을 모아둔 설계도이며,
      <br>
      다음 클래스로 분류됩니다.
    </p>
    <design-creator-step @setBanner="setBanner" @createDesign="createDesign"></design-creator-step>
    <v-divider></v-divider>
    <v-card class="template-designcreator-info" v-if="banner">
      <v-card-title primary-title>
        <h2>
          {{ banner.name }}(이)란?
        </h2>
      </v-card-title>
      <v-img :src="banner.image || ''" max-width="400" class="mx-3"></v-img>
      <v-card-text class="info-text" v-html="banner.description"></v-card-text>
    </v-card>
  </section>
</template>

<script>
  import DesignCreatorStep from './DesignCreatorStep'

  import fs from 'fs-extra'
  import path from 'path'
  import createItem from '@common/js/createItem'
  import createUUID from '@common/js/createUUID'

  export default {

    components: {
      DesignCreatorStep
    },
    props: ['data'],
    data: () => ({
      banner: null
    }),

    methods: {

      setBanner(name, image, description) {

        this.banner = {
          name,
          image,
          description
        }

      },

      createDesign(objClass) {

        let filenames, filename, __id
        let sample

        filenames = fs.readdirSync(this.directory)
        filenames = filenames.map(p => path.parse(p).name)

        filename = createItem(filenames, '새로운 디자인')
        filename += objClass.ext

        filename = path.join(this.directory, filename)

        sample = new objClass.Constructor
        sample = JSON.stringify(sample)
        sample = JSON.parse(sample)

        sample._id = createUUID()
        

        fs.writeJSONSync(filename, sample, {
          spaces: 2
        })

        this.close()

      },

      close() {
        this.$root.$emit('closeWorkspaceTab', this.data.id)
      }

    },

    created() {
      this.directory = this.data.directory
    }

  }
</script>

<style lang="scss" scoped>
  .template-designcreator {

    padding: 40px 20px;

    h1 {
      font-size: xx-large;
    }

    h2 {
      font-size: x-large;
    }

    >p {
      margin-top: 10px;
    }

    >div {
      margin-top: 20px;
    }

  }

  .template-designcreator-info {

    .info-text {
      color: #bbb;
    }

  }
</style>