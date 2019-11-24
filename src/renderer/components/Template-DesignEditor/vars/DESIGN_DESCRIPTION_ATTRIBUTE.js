export default {

  className: {
    description: '이 객체가 소속된 그룹을 지정합니다. 여러 그룹을 주고 싶다면, 띄어쓰기로 구분하세요.',
    valids: []
  },

  src: {
    description: '사용될 에셋의 경로를 지정합니다.',
    valids: []
  },

  text: {
    description: '텍스트 객체일 경우, 보여질 텍스트를 지정합니다.',
    valids: []
  },

  physics: {
    description: '물리 객체 타입을 지정합니다. "null"을 기입할 경우, 물리 객체가 되지 않습니다. "static"은 제자리에 고정되어있는 물리 객체이며, "dynamic"은 자유로운 물리 객체입니다.',
    valids: ['null', 'static', 'dynamic']
  },

  fixedrotation: {
    description: '물리 객체가 힘을 받았을 시, 회전 가능 여부를 설정합니다.',
    valids: ['false', 'true']
  },

  density: {
    description: '물리 객체의 밀도를 설정합니다. 객체의 무게에 영향을 미칩니다.',
    valids: ['0 ~ 𝑛']
  },

  friction: {
    description: '물리 객체의 마찰력을 설정합니다.',
    valids: ['0 ~ 𝑛']
  },

  restitution: {
    description: '물리 객체의 탄성력을 설정합니다.',
    valids: ['0 ~ 𝑛']
  },

  gravityscale: {
    description: '물리 객체의 중력 배율을 설정합니다. 음수를 기입할 경우, 역중력을 받습니다.',
    valids: ['±𝑛']
  },

  timescale: {
    description: '객체의 애니메이션 속도 배율을 설정합니다. 스프라이트, 비디오 객체일 경우 재생 속도에도 영향을 줍니다.',
    valids: ['0 ~ 𝑛']
  },

  loop: {
    description: '이 객체의 반복 재생 여부를 결정합니다.',
    valids: ['true', 'false']
  }

}