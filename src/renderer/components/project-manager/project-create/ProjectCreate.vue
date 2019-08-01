<template>
  <transition name="project-create">
    <div class="project-create">
      <header>
        <h1>에리엔진 프로젝트</h1>
        <p>
          왼쪽에서 새로운 프로젝트의 시작점으로 사용할 템플릿을 선택하세요.
          <br>
          이는 더욱 쉽게 게임을 제작할 수 있도록 도와줍니다.
        </p>
      </header>
      <div class="container">
        <Aside :project="project" :setting="setting"></Aside>
        <Main :project="project" :setting="setting"></Main>
      </div>
      <Footer :project="project" :setting="setting"></Footer>
    </div>
  </transition>
</template>

<script>
  import Aside from './aside/Aside'
  import Main from './main/Main'
  import Footer from './footer/Footer'

  import os from 'os'
  import path from 'path'
  import createUUID from '@static/js/createUUID'
  

  export default {
    components: {
      Aside,
      Main,
      Footer
    },
    data: () => ({
      project: {
        name: '새로운 프로젝트',
        directory: path.posix.join(os.homedir(), 'Desktop'),
        id: `org.izure.eriengine.p_${createUUID().split('-').pop()}`,
        width: 1366,
        height: 768,
        color: '#0075c8',
        backgroundColor: '#ffffff'
      },
      setting: {
        template: null,
        ready: false
      }
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 300px;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
  }

  p {
    font-size: small;
    line-height: 1.5;
  }
</style>