module.exports = {

  id: 'test-test',
  class: '테스트',
  title: '테스트 매크로입니다',
  description: '다국어 {{다국어}}, 값 {{값}}, 파일 {{파일}}, 선택 {{선택}}',
  variables: {
    '다국어': {
      text: '입력',
      type: 'text'
    },
    '값': {
      text: '입력2',
      type: 'value'
    },
    '파일': {
      text: 'undefined',
      type: 'file',
      list: ['.mp3', '.mp4']
    },
    '선택': {
      text: '1번',
      type: 'select',
      list: [{
          text: '1번',
          value: 1
        },
        {
          text: '2번',
          value: 2
        }
      ]
    }
  },
  run(next, stop) {

  },
  author: 'admin@izure.org',
  url: 'http://cafe.naver.com/lvejs'

}