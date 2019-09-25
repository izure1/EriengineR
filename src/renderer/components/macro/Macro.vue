<template>
  <section>
    <v-toolbar color="#333">
      <v-toolbar-title class="mr-3">
        <v-icon>widgets</v-icon>
      </v-toolbar-title>
      <v-autocomplete v-model="select" :items="macroLists" item-text="title" return-object flat solo-inverted
        hide-details label="찾고 싶은 매크로를 검색하세요" no-data-text="일치하는 매크로가 없습니다" class="mx-1"></v-autocomplete>
    </v-toolbar>
    <v-card>
      <section class="pa-5">
        <div class="macro-description-wrap body-2">
          <macro-description v-if="select" :select="select"></macro-description>
          <div v-else>상단에서 매크로를 선택하세요</div>
        </div>
        <v-card-actions>
          <v-btn right icon :disabled="!done">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </section>
      <section class="macro-footer mt-3 pa-5 body-2">
        <dl v-if="select">
          <dt>작성자</dt>
          <dd class="light-green--text caption">{{ getAuthor }}</dd>
          <dt class="mt-3">홈페이지</dt>
          <dd class="light-green--text caption">{{ getHomepage }}</dd>
        </dl>
      </section>
    </v-card>
  </section>
</template>

<script>
  import {
    ipcRenderer
  } from 'electron'

  import MacroDescription from './MacroDescription'

  export default {

    components: {
      MacroDescription
    },

    props: {
      information: Object
    },

    data: () => ({
      select: null,
      done: false,
      macroColumn: {}
    }),

    computed: {

      macroLists() {
        return this.macroColumn[this.information.column]
      },

      getAuthor() {

        if (!this.select) {
          return ''
        }

        return this.select.author || 'admin@izure.org'

      },

      getHomepage() {

        if (!this.select) {
          return ''
        }

        return this.select.url || 'https://cafe.naver.com/lvejs'

      }

    },

    methods: {

      getMacroColumn() {
        return ipcRenderer.sendSync('macro-get-list')
      }

    },

    watch: {

      information() {
        this.select = null
        this.done = false
      }

    },

    created() {
      this.macroColumn = this.getMacroColumn()
    }

  }
</script>

<style lang="scss" scoped>
  .macro-description-wrap {
    padding: 15px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .macro-footer {
    width: 100%;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>