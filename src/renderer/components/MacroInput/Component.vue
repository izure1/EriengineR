<template>
  <v-card>
    <v-tabs next-icon="arrow_forward_ios" prev-icon="arrow_back_ios">
      <v-tab v-for="tab in tabs" :key="tab.name" :href="'#tab-' + tab.name">{{ tab.name }}</v-tab>
      <v-tab-item v-for="tab in tabs" :key="tab.name" :value="'tab-' + tab.name">

        <macro-input-text v-if="      tab.type == 'text'     " @change="setInputValue" :tab="tab"></macro-input-text>
        <macro-input-text v-if="      tab.type == 'value'    " @change="setInputValue" :tab="tab"></macro-input-text>
        <macro-input-file v-if="      tab.type == 'file'     " @change="setInputValue" :tab="tab"></macro-input-file>
        <macro-input-radio v-if="     tab.type == 'radio'    " @change="setInputValue" :tab="tab"></macro-input-radio>
        <macro-input-keyboard v-if="  tab.type == 'keyboard' " @change="setInputValue" :tab="tab"></macro-input-keyboard>

      </v-tab-item>
    </v-tabs>
    <v-card-actions>
      <v-btn @click="save">
        <v-icon left>check</v-icon>
        저장
      </v-btn>
      <v-btn @click="clear">
        <v-icon left>clear</v-icon>
        취소
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import MacroInputText from '@/components/MacroInputText/Component'
  import MacroInputFile from '@/components/MacroInputFile/Component'
  import MacroInputRadio from '@/components/MacroInputRadio/Component'
  import MacroInputKeyboard from '@/components/MacroInputKeyboard/Component'

  export default {

    components: {
      MacroInputText,
      MacroInputFile,
      MacroInputRadio,
      MacroInputKeyboard,
    },

    props: {
      tabs: Array,
      isModalOpen: Boolean,
    },

    data: () => ({
      valueMap: new Map
    }),

    methods: {

      initValue() {
        let iterables = this.tabs.map(t => [t.name, t.value])
        this.valueMap = new Map(iterables)
      },

      setInputValue(u, v) {
        this.valueMap.set(u, v)
      },

      save() {

        let generator
        let v, i

        generator = this.valueMap.entries()
        v = {}

        while (i = generator.next(), !i.done) {

          let name, value

          name = i.value[0]
          value = i.value[1]

          v[name] = value

        }

        this.$emit('save', v)
        this.$emit('cancel')

      },

      clear() {
        this.$emit('cancel')
      }

    },

    watch: {

      tabs() {
        this.initValue()
      }

    }

  }
</script>