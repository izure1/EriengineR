<template>
  <aside>
    <ul>
      <li v-for="sample in samples" :key="sample.name">
        <a href="#" @click="setting.template = sample">
          <div class="project-aside-btn">+</div>
          <div class="project-aside-info">
            <div>
              <h3>{{ sample.name }}</h3>
              <p v-html="sample.description"></p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  import fs from 'fs-extra'
  import samples from '../Vars/samples'

  export default {
    props: {
      project: Object,
      setting: Object
    },
    data() {
      return {
        samples
      }
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    width: 400px;
    max-height: 100%;
    overflow: auto;
    overflow-x: hidden;
    flex: 0 0 auto;

    >ul {
      list-style: none;
      padding: 0;
      margin: 0;

      a {
        height: 100%;
        color: inherit;
        text-decoration: none;
        display: flex;
        flex-direction: row;

        &:hover {
          background-color: rgba(255, 255, 255, .1);
        }

        >div {
          height: 80px;
        }
      }
    }
  }

  .project-aside-btn {
    width: 70px;
    font-size: 70px;
    font-weight: bold;
    color: rgba(255, 255, 255, .3);
    text-align: center;
    line-height: 92px;
    flex: 0 0 auto;
    overflow: hidden;
  }

  .project-aside-info {
    flex: 1 1 auto;
    display: table;
    padding: 0 20px;
    margin: 0;
    box-sizing: border-box;

    >div {
      display: table-cell;
      vertical-align: middle;

      >h3 {
        font-size: medium;
        margin: 5px 0;
      }

      >p {
        font-size: 11px;
        color: darkgray;
        line-height: 1.5;
        margin: 5px 0;
      }
    }
  }
</style>