module.exports = {
  cid: '{56e476c4-ad72-4254-84b5-4fe473d87b5a}',
  version: '1.0.0',
  class: '제어',
  title: '게임 실행 환경을 비교합니다',
  description: '현재 게임을 실행하고 있는 환경이 {{환경}}(과)와 {{방식}}(일) 경우 작동합니다.',
  variables: {
    '환경': {
      text: '모바일',
      type: 'radio',
      sample: [{
          text: '모바일',
          value: 'android'
        },
        {
          text: '윈도우즈',
          value: 'windows'
        },
        {
          text: '브라우저',
          value: 'web'
        }
      ]
    },
    '방식': {
      text: '일치',
      type: 'radio',
      sample: [{
          text: '일치',
          value: 1
        },
        {
          text: '불일치',
          value: 2
        }
      ],
      skip: true
    }
  },
  fn: function (next, stop, e) {
    let RE = Eri.util.RE;
    switch (this.방식) {
      case 1:
        {
          if (RE === this.환경) next();
          else stop();
          break;
        }
      case 2:
        {
          if (RE !== this.환경) next();
          else stop();
          break;
        }
      default:
        {
          stop();
          break;
        }
    }
  }
};