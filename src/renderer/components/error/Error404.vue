<template>
  <section id="error">
    <div>
      <div class="error-flex">
        <div>
          <img src="~@/assets/img/logo_eri_notab.png">
        </div>
        <div class="error-flex-text">
          <h3>이런!</h3>
          <p>엔진에 오류가 발생했습니다</p>
          <p>오류가 계속될 시 개발자 센터로 신고를 해주십시오</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style lang="scss" scoped>
  #error {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;

    >div {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .error-flex {
    width: 600px;
    display: table;
    flex-direction: row;
    margin: 0 auto;

    >div {
      flex: 0 0 300px;
      display: table-cell;
      vertical-align: middle;
    }
  }

  .error-flex-text {
    text-align: initial;

    >p {
      margin: 7px 0;
    }
  }
</style>