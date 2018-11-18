<template>
  <div class="aside-section-tab">
    <div>
      <article>
        <h4>일람</h4>
        <p>
          게임을 만드는데는 많은 작업이 필요합니다.
        </p>
        <p>
          왼쪽 탭 기능을 이용하세요.
          <br>
          제작에 필요한 요소들을 관리할 수 있습니다.
        </p>
      </article>
      <article>
        <h4>튜토리얼</h4>
        <p>
          엔진에 관련된 간단한 튜토리얼이 필요하다면 아래를 클릭하세요.
        </p>
      </article>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';

  .aside-section-tab>div {
    min-width: 240px;
    padding: 20px;
  }

  p {
    font-size: small;
    line-height: 1.5;
  }
</style>