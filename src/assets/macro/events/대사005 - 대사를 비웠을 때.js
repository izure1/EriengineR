module.exports = {
  cid: '{78b243b1-79b8-4f87-a4b3-492120b635fc}',
  version: '1.0.0',
  class: '대사',
  title: '대사를 비웠을 때',
  description: '대사를 비웠을 때 작동합니다.',
  fn: function (start) {
    Eri.process.on('dialogclear', start);
  }
};