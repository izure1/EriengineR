module.exports = {
  cid: '{e6f15acb-ae15-4e83-bdf2-8a3f91c95b28}',
  version: '1.0.0',
  class: '대사',
  title: '대사가 출력이 끝났을 때',
  description: '대사가 출력이 끝났을 때 작동합니다. <br>이는 대사가 모두 출력되고 정상적으로 종료되었을 때 작동을 보장합니다. <br>대사를 넘겼을 때는 작동하지 않습니다.',
  fn: function (start) {
    Eri.process.on('dialogprintend', start);
  }
};