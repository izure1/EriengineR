export default {

  src: {
    description: '사용될 스프라이트 에셋의 경로를 지정합니다.',
    valids: []
  },

  fps: {
    description: '초당 프레임 재생 속도를 지정합니다. 가령 10이면, 초당 10만큼의 프레임이 재생됩니다.',
    valids: ['0 ~ 𝑛']
  },

  frame: {
    description: '이 이미지에 총 몇개의 프레임이 들어있는지 기입하세요. 정확해야 합니다.',
    valids: ['1 ~ 𝑛']
  },

  start: {
    description: '몇 번째 프레임부터 애니메이션이 시작되는지 기입하세요. 0부터 시작합니다.',
    valids: ['1 ~ 𝑛']
  },

  end: {
    description: '몇 번째 프레임에서 애니메이션이 종료되는지 기입하세요. 0부터 시작합니다.',
    valids: ['1 ~ 𝑛']
  },

}