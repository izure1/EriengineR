<template>
  <div class="aside-section-tab">
    <ol>
      <li>
        <h4 class="subtitle-1 light-green--text">안녕하세요!</h4>
        <p>
          에리엔진에 오신 것을 환영합니다.
        </p>
        <p>
          이 페이지에선 간단한 사용법만 다룹니다.
          <br>
          좀 더 자세한 내용은 튜토리얼이나, 공식 카페에서 서로 교류해가며 정보를 공유하세요.
        </p>
      </li>
      <li>
        <h4 class="subtitle-1 light-green--text">일람</h4>
        <p>
          게임을 만드는데는 많은 작업이 필요합니다.
        </p>
        <p>
          파일 탐색기 기능을 이용하세요.
          <br>
          제작에 필요한 요소들을 관리할 수 있습니다.
          <br>
          파일 탐색기는 좌측에 있습니다.
        </p>
      </li>
      <li>
        <h4 class="subtitle-1 light-green--text">파일 관리 방법</h4>
        <p>
          파일 탐색기에서 파일 및 폴더를 우클릭해보세요.
        </p>
        <p>
          해당하는 작업을 선택할 수 있습니다.
          <br>
          편집, 삭제 모두 이곳에서 관리하세요.
        </p>
      </li>
      <li>
        <h4 class="subtitle-1 light-green--text">주의점</h4>
        <p>
          파일을 우클릭하여 탐색기에서 확인할 수 있습니다만,
          <br>
          <span class="orange--text">절대로 직접 옮기거나 수정하지 마세요.</span>
          <br>
          모든 건 좌측의 파일 탐색기에서만 작업하세요.
        </p>
        <p>
          에리엔진 밖에서 파일을 조작하는 건 위험합니다.
        </p>
      </li>
      <li>
        <h4 class="subtitle-1 light-green--text">튜토리얼</h4>
        <p>
          엔진에 관련된 간단한 튜토리얼이 필요하다면 아래를 클릭하세요.
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/aside-section-tab.scss';

  .aside-section-tab>ol {
    min-width: 240px;
    padding: 20px 20px 20px 35px;
    list-style-type:lower-greek;

    h4 {
      margin: 3px 0;
    }

    >li:not(:nth-of-type(1)) {
      margin-top: 40px;
    }
  }

  p {
    font-size: small;
    line-height: 1.5;
    word-break: keep-all;
  }
</style>