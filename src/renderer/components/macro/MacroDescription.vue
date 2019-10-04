<template>
  <div>
    <v-runtime-template :template="description"></v-runtime-template>
    <v-dialog v-model="isModalOpen" persistent max-width="70%">
      <macro-input :tabs="tabs" @cancel="closeInputModal" @save="getInputValue"></macro-input>
    </v-dialog>
  </div>
</template>

<script>
  import VRuntimeTemplate from 'v-runtime-template'
  import REGEXP from '@/assets/js/REGEXP'
  import {
    VariableParser
  } from '@common/js/Variable'

  import MacroInput from './MacroInput'
  import {
    ipcRenderer
  } from 'electron'


  export default {

    components: {
      VRuntimeTemplate,
      MacroInput
    },

    props: {
      select: Object,
      macro: Object
    },

    data: () => ({
      description: '<div></div>',
      isModalOpen: false,
      tabs: [],
      tabsVarName: null,
    }),

    methods: {

      isAllDataInputted() {

        // this.select 로 넘겨받은 매크로 원형에 있는 모든 변수가 입력되었습니까?
        let neededProps
        let inputtedProps
        let notInputtedProps

        neededProps = Object.keys(this.select.variables)
        inputtedProps = Object.keys(this.macro.variables)

        notInputtedProps = neededProps.filter(t => inputtedProps.indexOf(t) === -1)


        if (notInputtedProps.length) {
          return false
        }


        // this.macro 에서 사용된 모든 변수가 skip = true 입니까?
        let notSkippedProps = inputtedProps.filter(t => !this.macro.variables[t].skip)

        if (notSkippedProps.length) {
          return false
        }

        return true

      },

      changeDescription() {
        this.description = this.getParsedDescription()
      },

      getInputValue(v) {

        for (let name in v) {

          let variable
          let property, value

          property = this.tabsVarName
          value = v[name]

          variable = this.getMatchedVariable(property)
          variable.setInputData(value)

          this.macro.variables[property] = variable

        }

        this.changeDescription()
        this.sendModifyStatus(this.isAllDataInputted())

      },

      getMatchedVariable(name) {

        let parser
        let v

        parser = new VariableParser

        // 이전에 입력했던 매크로의 변수에 값이 있을 경우 해당 값의 text를 가져온다
        if (name in this.macro.variables && name in this.select.variables) {
          v = this.macro.variables[name]
        }
        // 이전에 입력되지 않은 값이라면, 원본 값을 가져온다
        else {

          v = this.select.variables[name]
          v = parser.parseFromInformation(v)

        }

        return v

      },

      getParsedDescription() {

        let description

        description = this.select.description.replace(REGEXP.variable, (matched, name) => {

          let v = this.getMatchedVariable(name)
          return `<kbd @click="openInputModal('${name}')">${v.text}</kbd>`

        })

        return `<div>${description}</div>`

      },

      openInputModal(name) {

        let inputData

        // 사용자가 입력해야 할 값들을 getInputData 메서드를 이용해 가져옵니다. (VariableInputData)
        // 이 값은 this.tabs 에 추가되어, MacroInput.vue 로 props 를 이용하여 전송됩니다.

        // 해당 매크로의 변수명으로 변수를 생성합니다 (TextVariable, ValueVariable, FileVariable, RadioVariable 등)
        inputData = this.getMatchedVariable(name)
        // 해당 변수에서 입력해야할 값의 목록을 만듭니다. 가령 TextVariable 변수는 다국어를 입력해야하므로, 현재 있는 다국어 개수만큼 inputData 를 가져옵니다.
        inputData = inputData.getInputDatas()

        this.isModalOpen = true
        this.tabs = inputData
        this.tabsVarName = name

      },

      closeInputModal() {
        this.isModalOpen = false
      },

      sendModifyStatus(done = true) {
        this.$emit('modify', done, this.macro)
      }

    },

    watch: {

      select() {
        this.changeDescription()
      },

      macro() {
        this.sendModifyStatus(this.isAllDataInputted())
      }

    },

    created() {
      this.changeDescription()
      this.sendModifyStatus(this.isAllDataInputted())
    }

  }
</script>

<style lang="scss" scoped>

</style>