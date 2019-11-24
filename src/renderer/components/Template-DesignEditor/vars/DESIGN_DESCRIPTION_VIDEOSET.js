export default {

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
  },

  muted: {
    description: '음소거 여부를 지정합니다.',
    valids: ['true', 'false']
  },

  playing: {
    description: '재생 여부를 지정합니다.',
    valids: ['true', 'false']
  }

}