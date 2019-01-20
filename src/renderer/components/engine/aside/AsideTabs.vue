<template>
  <ul>
    <li v-for="(tab, index) in tabs" :key="index">
      <a href="#" @click="selectTab" @mouseover="tab.hover = true" @mouseout="tab.hover = false" :data-key="index"
        :data-unique="tab.id" :title="tab.alt">
        <div v-if="tab.select" class="tab-highlight">
          <div></div>
          <div></div>
        </div>
        <span v-if="tab.select" class="tab-hovering">{{ tab.icon }}</span>
        <span v-else-if="tab.hover" class="tab-hovering">{{ tab.icon }}</span>
        <span v-else>{{ tab.icon }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import TABS from './vars/TABS'

  export default {
    methods: {
      selectTab(e) {
        let key
        let id

        id = e.target.dataset.unique
        key = e.target.dataset.key
        key -= 0

        for (let tab of this.tabs) {
          tab.select = false
        }

        this.tabs[key].select = true
        this.$root.$emit('showAsideTab', this.tabs[key].id)
      }
    },
    data() {
      return {
        tabs: new TABS()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'sylarStencil';
    src: url('~@/assets/fonts/sylarStencil.woff');
  }

  ul {
    width: 60px;
    height: 100%;
    list-style: none;
    background-color: #555;
    position: relative;
    z-index: 0;
  }

  ul,
  li {
    padding: 0;
    margin: 0;
  }

  li {
    height: 60px;
    text-align: center;

    a {
      display: block;
      width: 100%;
      height: 100%;
      color: inherit;
      text-decoration: none;
      position: relative;

      >* {
        pointer-events: none;
        z-index: 1;
      }

      .tab-highlight {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #444;
        z-index: -1;

        >div {
          width: 14px;
          height: 14px;
          position: absolute;
          right: 0;
          background-color: #444;

          &:nth-of-type(1) {
            top: -14px;

            &:after {
              border-bottom-right-radius: 7px;
            }
          }

          &:nth-of-type(2) {
            bottom: -14px;

            &:after {
              border-top-right-radius: 7px;
            }
          }

          &:after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            background-color: #555;
            display: block;
          }
        }

      }

      span {
        font-size: xx-large;
        font-weight: bold;
        font-family: 'sylarStencil';
        color: gray;
        line-height: 60px;
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

        &.tab-hovering {
          color: white;
          text-shadow: none;
        }
      }
    }
  }
</style>