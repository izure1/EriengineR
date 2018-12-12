<template>
  <main>
    <div v-if="!setting.template" class="project-setting-empty">
      <h2>프로젝트 세부 설정</h2>
      <ol>
        <li>좌측에서 프로젝트 템플릿을 선택하세요.</li>
        <li>이곳에서 세부 설정을 시작하세요.</li>
      </ol>
    </div>
    <div v-else class="project-setting">
      <dl>
        <dt>프로젝트 템플릿</dt>
        <dd style="color:orange">{{ setting.template.name }}</dd>
        <dt title="당신이 만들 게임의 이름입니다">프로젝트 이름</dt>
        <dd>
          <input type="text" placeholder="이곳에 프로젝트 이름을 입력하세요" v-model="project.name" class="project-setting-needed"
            :class="{invalid: !checkValidName}">
        </dd>
        <dt title="잘 모른다면 건드리지 마세요. 절대 중복되어선 안되며, 이후 변경할 수 없습니다">프로젝트 고유명</dt>
        <dd>
          <input type="text" placeholder="이곳에 프로젝트의 고유명을 입력하세요 (ex. org.izure.eriengine)" v-model="project.id" class="project-setting-needed"
            :class="{invalid: !checkValidId}">
        </dd>
        <dt title="게임의 최대 해상도를 설정합니다">해상도</dt>
        <dd>
          <div class="project-setting-resolution">
            <div>
              <p>가로</p>
              <input type="number" min="1" placeholder="1366" v-model.number="project.width" class="project-setting-needed"
                :class="{invalid: !checkValidWidth}">
            </div>
            <div>
              <p>세로</p>
              <input type="number" min="1" placeholder="768" v-model.number="project.height" class="project-setting-needed"
                :class="{invalid: !checkValidHeight}">
            </div>
          </div>
        </dd>
      </dl>
    </div>
  </main>
</template>

<script>
  export default {
    props: {
      project: Object,
      setting: Object
    },
    computed: {
      checkValidName() {
        return this.project.name
      },
      checkValidId() {
        let exp

        exp = /^([A-Za-z]{1}[A-Za-z\d_]*\.)*[A-Za-z][A-Za-z\d_]*$/
        exp = exp.test(this.project.id)

        return exp
      },
      checkValidWidth() {
        return (this.project.width - 0) > 0
      },
      checkValidHeight() {
        return (this.project.height - 0) > 0
      }
    },
    updated() {

      let needed
      let el

      needed = this.$parent.$el.querySelectorAll('.project-setting-needed.invalid')
      needed = needed.length

      this.setting.ready = !needed

    }
  }
</script>

<style lang="scss" scoped>
  main {
    width: 400px;
    max-height: 100%;
    overflow: auto;
    overflow-x: hidden;
    flex: 1 1 auto;
    margin-left: 30px;
  }

  .project-setting-empty {
    padding: 1px;

    >h2 {
      margin: 10px 0;
    }

    >ol {
      list-style-type: upper-roman;

      >li {
        font-size: medium;
        color: darkgray;
        padding: 0 10px;
        margin: 5px 0;
      }
    }
  }

  .project-setting {
    padding: 1px;
    position: relative;

    dt {
      font-weight: bold;
      margin: 20px 0 10px;

      &::after {
        content: attr(title);
        font-size: 11px;
        font-weight: normal;
        color: lightgray;
        line-height: 1.5;
        display: block;
        margin-top: 3px;
      }
    }

    dd {
      font-size: small;

      input[type="text"],
      input[type="number"] {
        width: calc(100% - 10px);
        height: 30px;
        background-color: transparent;
        border: 0;
        outline: none;
        transition: background-color 0.1s linear;
        padding: 0 10px;
        margin: 0;
        box-sizing: border-box;

        &:focus,
        &:hover {
          background-color: rgba(255, 255, 255, .1);
        }
      }
    }
  }

  .project-setting-resolution {
    display: flex;
    flex-direction: row;

    >div {
      flex: 0 0 110px;
      margin: 0 10px;

      >p {
        padding: 10px;
        margin: 5px 0;
      }

      >input {
        font-size: medium;
      }
    }
  }

  .project-setting-needed {

    &.invalid {
      background-color: rgba(255, 0, 0, .5) !important;
    }
  }
</style>