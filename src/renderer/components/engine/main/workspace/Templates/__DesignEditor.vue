<template>
  <section class="template-designeditor">
    <design-editor-asset :data="data" :requestReadFile="requestReadFile"></design-editor-asset>
    <design-editor-dataset :data="data" :requestReadFile="requestReadFile"></design-editor-dataset>
    <design-editor-attribute :data="data" :requestReadFile="requestReadFile"></design-editor-attribute>
    <design-editor-spot :data="data" :requestReadFile="requestReadFile" :updateTimestamp="updateTimestamp">
    </design-editor-spot>
  </section>
</template>

<script>
  import fs from 'fs-extra'
  import path from 'path'

  import DESIGN_ATTRIBUTE_EXTEND from './js/DESIGN_ATTRIBUTE_EXTEND'
  import DESIGN_STYLE_EXTEND from './js/DESIGN_STYLE_EXTEND'

  export default {

    components: {
    },
    props: ['data'],
    
    data: () => ({
    }),

    methods: {

      copyJSON(o) {
        return JSON.parse(JSON.stringify(o))
      },

      requestReadFile(all = false) {

        let raw

        raw = fs.readJSONSync(this.data.path)
        raw = Object.assign({}, this.sampleAttribute, raw)
        raw = Object.assign({}, this.attribute_extend, raw)
        raw.style = Object.assign({}, this.style_extend, raw.style)

        raw = this.copyJSON(raw)

        if (all) {
          return raw
        }

        // 파일에 저장되지 않아야 할 것들을 이곳에 정리합니다
        delete raw.name
        delete raw.src
        delete raw.scene
        delete raw.element
        delete raw.animationset
        delete raw.physicsset
        delete raw.followset
        delete raw.spriteset
        delete raw.videoset

        delete raw.style.position
        delete raw.style.left
        delete raw.style.bottom
        delete raw.style.perspective
        delete raw.style.gradient
        delete raw.style.gradientDirection
        delete raw.style.gradientType
        delete raw.style.margin

        return raw

      },

      watchFile() {
        this.updateTimestamp = new Date
      }

    },

    created() {
      fs.watchFile(this.data.path, this.watchFile)
    },

    destroyed() {
      fs.unwatchFile(this.data.path, this.watchFile)
    }

  }
</script>

<style lang="scss" scoped>
  .template-designeditor {
    padding: 30px;
  }
</style>