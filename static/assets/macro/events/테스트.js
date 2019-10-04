module.exports = {

  id: 'test-test',
  class: '테스트',
  title: '테스트 매크로입니다',
  description: '다국어 {{다국어}}, 값 {{값}}, 파일 {{파일}}, 선택 {{선택}}',
  variables: {
    '다국어': {
      value: '입력',
      type: 'text'
    },
    '값': {
      value: '입력2',
      type: 'value'
    },
    '파일': {
      value: 'undefined',
      type: 'file',
      lists: ['.png', '.mp3', '.mp4']
    },
    '선택': {
      value: 1,
      type: 'radio',
      lists: [{
          text: '1번',
          value: 1
        },
        {
          text: '2번',
          value: 2
        }
      ],
      skip: true
    }
  },
  run(next, stop) {

  },
  author: 'admin@izure.org',
  url: 'http://cafe.naver.com/lvejs'

}