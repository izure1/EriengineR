<template>
  <footer>
    <hr>
    <div class="project-setting-directory">
      <div class="project-setting-directory-preview">
        <p>프로젝트 디렉토리</p>
        <a href="#" @click="selectDirectory" :title="getFullDirectoryPath">{{ getFullDirectoryPath }}</a>
      </div>
      <div class="project-setting-directory-done">
        <button @click="createProject" :disabled="!setting.ready" v-if="!creating">
          {{ setting.ready ? '프로젝트 생성하기': '세부 설정을 입력하세요'}}
        </button>
        <button disabled v-if="creating">
          <img src="@/assets/img/ico_loading.svg">
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
  import electron from 'electron'
  import path from 'path'

  export default {
    data: () => ({
      creating: false
    }),
    props: {
      project: Object,
      setting: Object
    },
    computed: {
      getFullDirectoryPath() {
        return path.join(this.project.directory, this.project.id)
      }
    },
    methods: {
      selectDirectory() {

        let directoryPath

        directoryPath = electron.ipcRenderer.sendSync('modal-open-sync', {
          title: '디렉토리를 선택해주세요',
          properties: ['openDirectory'],
          defaultPath: this.project.directory
        })

        if (directoryPath) {
          this.project.directory = directoryPath[0]
        }

      },
      createProject() {

        this.creating = true

        electron.ipcRenderer.send('project-create', Object.assign({}, this.project, this.setting))
        electron.ipcRenderer.once('project-create', async (e, msg) => {

          this.creating = false

          if (!msg.success) {
            return
          }

          electron.ipcRenderer.send('project-open', msg.esproject)

        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  hr {
    height: 1px;
    border: 0;
    background: linear-gradient(90deg, transparent, gray, transparent);
    margin: 40px 0 20px;
  }

  .project-setting-directory {
    display: flex;
    flex-direction: row;
  }

  .project-setting-directory-preview {
    max-width: 80%;
    flex: 1 0 auto;

    >p {
      margin: 5px 10px;
    }

    >a {
      font-size: small;
      color: orange;
      text-decoration: none;
      letter-spacing: 1px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px;

      &:hover {
        background-color: rgba(255, 255, 255, .1);
      }
    }
  }

  .project-setting-directory-done {
    width: calc(20% - 10px);
    flex: 0 0 auto;
    margin-left: 10px;

    >button {
      width: 100%;
      height: 100%;
      font-size: medium;
      color: white;
      letter-spacing: -1px;
      display: block;
      border: 0;
      outline: none;
      background-color: rgba(255, 255, 255, .1);
      cursor: pointer;

      >img {
        width: 50px;
        height: 50px;
      }

      &:disabled {
        color: gray;
        cursor: initial;
      }

      &:not(:disabled):hover {
        background-color: rgba(255, 255, 255, .3);
      }
    }
  }
</style>