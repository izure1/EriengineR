export default {

  src: {
    description: '사용될 에셋의 경로를 지정합니다.',
    valids: []
  },

  text: {
    description: '보여질 텍스트를 지정합니다.',
    valids: []
  },

  volume: {
    description: '볼륨 크기를 지정합니다.',
    valids: ['0 ~ 1']
  },

  playbackRate: {
    description: '재생 속도를 지정합니다. 최대 3배까지 가능합니다.',
    valids: ['0 ~ 3']
  },

  currentTime: {
    description: '현재 재생되고 있는 시각(초)를 지정합니다. 값을 지정하여 현재 재생 위치를 변경할 수 있습니다.',
    valids: ['0 ~ 𝑛']
  }

}