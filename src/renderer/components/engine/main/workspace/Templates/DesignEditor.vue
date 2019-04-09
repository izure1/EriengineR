<template>
  <section class="template-designeditor">
    <design-editor-dataset :data="data" :requestReadFile="requestReadFile"></design-editor-dataset>
    <design-editor-attribute :data="data" :requestReadFile="requestReadFile"></design-editor-attribute>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import DesignEditorDataset from './DesignEditorDataset'
  import DesignEditorAttribute from './DesignEditorAttribute'

  export default {

    components: {
      DesignEditorDataset,
      DesignEditorAttribute
    },
    props: ['data'],

    methods: {

      requestReadFile() {
        return fs.readJSONSync(this.data.path)
      }

    }

  }
</script>

<style lang="scss" scoped>
  .template-designeditor {
    padding: 30px;
  }

  .information-description {
    font-size: small;
  }
</style>