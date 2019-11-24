export default {

  blendMode: {
    description: '파티클 입자의 그림 타입을 설정합니다.',
    valids: ['source-over', 'lighter', 'multiply', 'screen', 'overlay']
  },

  duration: {
    description: '파티클 입자의 생존 기간(ms)입니다. 이 이후에 입자는 사라집니다.',
    valids: ['0 ~ 𝑛']
  },

  interval: {
    description: '파티클 입자의 생성 간격(ms)입니다. 이 시간마다 입자가 새로이 한 개씩 생성됩니다.',
    valids: ['0 ~ 𝑛']
  },

  speed: {
    description: '파티클 입자의 뿜어져 나오는 속도입니다.',
    valids: ['0 ~ 𝑛']
  },

  start: {
    description: '파티클 입자가 생성되었을 때 크기 배율입니다.',
    valids: ['0 ~ 𝑛']
  },

  end: {
    description: '파티클 입자가 사라질 때 최종 크기 배율입니다.',
    valids: ['0 ~ 𝑛']
  },

  fixedRotation: {
    description: '파티클 입자가 힘을 받았을 시, 회전 가능 여부를 설정합니다.',
    valids: ['true', 'false']
  },

  gravityScale: {
    description: '파티클 입자의 중력 배율을 설정합니다. 음수를 기입할 경우, 역중력을 받습니다.',
    valids: ['±𝑛']
  },

  density: {
    description: '파티클 입자의 밀도를 설정합니다. 입자의 무게에 영향을 미칩니다.',
    valids: ['0 ~ 𝑛']
  },

  friction: {
    description: '파티클 입자의 마찰력을 설정합니다.',
    valids: ['0 ~ 𝑛']
  },

  restitution: {
    description: '파티클 입자의 탄성력을 설정합니다.',
    valids: ['0 ~ 𝑛']
  },

  playing: {
    description: '파티클 생성기의 재생 여부를 설정합니다.',
    valids: ['true', 'false']
  },

  rangeX: {
    description: '파티클 입자가 이 범위만큼의 ｘ좌표 공간에 랜덤하게 생성됩니다. 넓은 지역에 입자를 생성할 때 좋습니다.',
    valids: ['0 ~ 𝑛']
  },

  rangeY: {
    description: '파티클 입자가 이 범위만큼의 ｙ좌표 공간에 랜덤하게 생성됩니다. 넓은 지역에 입자를 생성할 때 좋습니다.',
    valids: ['0 ~ 𝑛']
  },

  rangeZ: {
    description: '파티클 입자가 이 범위만큼의 ｚ좌표 공간에 랜덤하게 생성됩니다. 넓은 지역에 입자를 생성할 때 좋습니다.',
    valids: ['0 ~ 𝑛']
  },

  fadeIn: {
    description: '파티클 입자가 몇 초(ms)에 걸쳐 페이드인되며 생성될 지 설정합니다.',
    valids: ['0 ~ 𝑛']
  },

  fadeOut: {
    description: '파티클 입자가 몇 초(ms)에 걸쳐 페이드아웃되며 사라질 지 설정합니다.',
    valids: ['0 ~ 𝑛']
  }

}