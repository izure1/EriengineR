<template>
  <div class="project-open">
    <div>
      <div>
        <img src="@/assets/img/ico_loading.svg">
      </div>
      <p>프로젝트를 불러오는 중입니다…</p>
    </div>
  </div>
</template>

<script>
  import os from 'os'
  import electron from 'electron'

  export default {
    props: {
      workspaceType: Boolean
    },
    mounted() {

      let projectDirectory

      projectDirectory = electron.ipcRenderer.sendSync('modal-open-sync', {
        title: '프로젝트를 선택해주세요',
        filters: [{
          name: '에리엔진 프로젝트 파일',
          extensions: ['esproject']
        }]
      })

      if (!projectDirectory) {
        this.$emit('failOpenProject')
        return
      }

      projectDirectory = projectDirectory[0]
      electron.ipcRenderer.send('project-open', projectDirectory)

    }
  }
</script>

<style lang="scss" scoped>
  .project-open {
    width: 100%;
    height: 100%;
    display: table;

    >div {
      text-align: center;
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>