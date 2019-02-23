module.exports = {
  cid: '{473a7d1b-5dfa-4f75-a7ca-527eda831155}',
  version: '1.0.0',
  class: '대사',
  title: '대사를 넘겼을 때',
  description: '대사를 넘겼을 때 작동합니다.',
	variables: {},
  fn: function (start) {
    Eri.process.on('dialogprintskip', start);
  }
};