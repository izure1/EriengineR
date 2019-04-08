<template>
  <section class="template-designcreator">
    <h1>생성할 디자인 종류</h1>
    <p>
      디자인이란, 게임에서 보여줄 어떤 물체의 공통된 특징을 모아둔 설계도이며,
      <br>
      다음 {{ designs.length }}가지로 분류됩니다.
    </p>
    <div>
      <v-select :items="designs" v-model="ext" item-text="name" item-value="ext" label="타입을 선택하세요" box>
      </v-select>
    </div>
    <v-btn :disabled="!ext" @click="createDesign">
      <v-icon>save</v-icon>만들기
    </v-btn>
    <div v-if="ext">
      <v-divider></v-divider>
    </div>
    <v-card v-for="(design, index) in designs" :key="index" v-if="ext === design.ext"
      class="template-designcreator-info">
      <v-card-title primary-title>
        <h2>
          {{ design.name }}(이)란?
        </h2>
      </v-card-title>
      <v-img :src="design.image" max-width="400" class="mx-3"></v-img>
      <v-card-text class="info-text" v-html="design.description"></v-card-text>
    </v-card>
  </section>
</template>

<script>
  import DESIGN_LIST from './js/DESIGN_LIST'

  import fs from 'fs-extra'
  import path from 'path'
  import createItem from '@static/js/createItem'

  export default {

    props: ['data'],
    data: () => ({
      directory: null,
      ext: null,
      designs: DESIGN_LIST
    }),

    methods: {

      createDesign() {

        let filenames, filename

        filenames = fs.readdirSync(this.directory)
        filenames = filenames.map(p => path.parse(p).name)

        filename = createItem(filenames, '새로운 디자인')
        filename += this.ext

        filename = path.join(this.directory, filename)

        fs.writeJSONSync(filename, {})

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