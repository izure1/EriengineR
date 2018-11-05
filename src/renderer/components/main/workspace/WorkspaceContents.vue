<template>
  <ul class="workspace-contents">
    <li v-for="(item, index) in tabs" :key="index" v-show="item.show">
      <section>{{ item.id }}</section>
    </li>
  </ul>
</template>

<script>
  import UUID from '@/js/UUID'
  import WorkspaceContent from './js/WorkspaceContent'

  export default {
    data() {
      return {
        tabs: []
      }
    },
    methods: {

      createContent(id) {

        this.tabs.push(new WorkspaceContent(id))

      },

      showContent(id) {

        let tab

        tab = this.tabs.filter(t => {
          t.show = false
          return t.id === id
        })

        if (tab = tab[0]) {
          tab.show = true
        }

      },

      closeContent(id) {

        let i
        let t

        i = this.tabs.length

        while (i--) {

          t = this.tabs[i]

          if (t.id !== id) continue

          this.tabs.splice(i, 1)
          break

        }

      }

    },

    mounted() {

      this.$root.$on('createWorkspaceTab-content', id => {
        this.createContent(id)
      });

      this.$root.$on('showWorkspaceTab-content', id => {
        this.showContent(id)
      })

      this.$root.$on('closeWorkspaceTab-content', id => {
        this.closeContent(id);
      })

    }
  }
</script>

<style lang="scss" scoped>
  ul,
  li {
    padding: 0;
    margin: 0;
  }

  .workspace-contents {
    width: 100%;
    height: calc(100% - 33px);

    >li {
      width: 100%;
      height: 100%;

      >section {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>