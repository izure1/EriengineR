<template>
  <section id="project">
    <transition name="project-workspace">
      <div class="project-workspace" v-if="workspaceType === null">
        <div class="project-workspace-type">
          <div>
            <button @click="selectWorkspaceType('open')">기존 프로젝트 열기</button>
            <button @click="selectWorkspaceType('create')">새로운 프로젝트 시작</button>
          </div>
        </div>
      </div>
    </transition>
    <project-create v-if="workspaceType === 'create'"></project-create>
    <project-open v-else-if="workspaceType === 'open'" @failOpenProject="workspaceType = null"></project-open>
  </section>
</template>

<script>
  import electron from 'electron'

  import ProjectCreate from './project-create/ProjectCreate'
  import ProjectOpen from './project-open/ProjectOpen'

  import snd_startup from '@/assets/media/snd_startup.mp3'


  let audio_startup

  export default {
    components: {
      ProjectCreate,
      ProjectOpen
    },
    data: () => ({
      workspaceType: null
    }),
    methods: {

      playLogoSound() {
        audio_startup = new Audio(snd_startup)
        audio_startup.play()
      },

      disableMenu() {
        electron.remote.getCurrentWindow().emit('menu-disable')
      },

      selectWorkspaceType(type) {
        this.workspaceType = type
        audio_startup.pause()
      }

    },
    mounted() {

      this.playLogoSound()
      this.disableMenu()

    }
  }
</script>

<style lang="scss" scoped>
  #project {
    height: 100%;
    color: white;
    background-color: #282c34;
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .project-workspace {
    height: 100%;
  }

  .project-workspace-type {
    width: 100%;
    height: 100%;
    display: table;

    >div {
      text-align: center;
      display: table-cell;
      vertical-align: middle;

      >button {
        width: 800px;
        height: 100px;
        font-size: xx-large;
        color: white;
        margin: 10px auto;
        display: block;
        background-color: transparent;
        border: 0;
        cursor: pointer;

        &:hover {
          color: white;
          background-color: #0075c8;
        }
      }
    }
  }
</style>