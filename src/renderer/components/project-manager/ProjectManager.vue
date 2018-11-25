<template>
  <section id="project">
    <header>
      <h1>에리엔진 프로젝트</h1>
      <p>
        왼쪽에서 새로운 프로젝트의 시작점으로 사용할 템플릿을 선택하세요.
        <br>
        이는 더욱 쉽게 게임을 제작할 수 있도록 도와줍니다.
      </p>
    </header>
    <div class="container">
      <Aside :project="project"></Aside>
      <Main :project="project"></Main>
    </div>
    <Footer :project="project"></Footer>
  </section>
</template>

<script>
  import Aside from './Aside/Aside'
  import Main from './Main/Main'
  import Footer from './Footer/Footer'

  import os from 'os'
  import path from 'path'
  import createUUID from '@/js/createUUID'

  export default {
    components: {
      Aside,
      Main,
      Footer
    },
    data() {
      return {
        project: {
          name: '새로운 프로젝트',
          template: null,
          directory: path.join(os.homedir(), 'Desktop'),
          id: this.getProjectUUID(),
          width: 1366,
          height: 768,
        }
      }
    },
    methods: {
      getProjectUUID() {
        return `org.izure.eriengine.p_${createUUID().split('-').pop()}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  p {
    font-size: small;
    line-height: 1.5;
  }

  #project {
    min-height: 100%;
    color: white;
    background-color: #282c34;
    padding: 30px;
    box-sizing: border-box;
  }

  .container {
    height: 300px;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
  }
</style>