export default {

  fontSize: {
    description: '텍스트 객체일 경우, 글자의 크기를 결정합니다.',
    valids: ['0 ~ 𝑛']
  },

  fontFamily: {
    description: '텍스트 객체일 경우, 글꼴을 지정합니다. 쉼표로 우선 순위를 지정할 수 있으며, 만일 해당 글꼴을 사용할 수 없으면 다음 글꼴 순서대로 불러옵니다.',
    valids: []
  },

  fontWeight: {
    description: '텍스트 객체일 경우, 글자의 두께를 지정합니다.',
    valids: ['normal', 'bold']
  },

  fontStyle: {
    description: '텍스트 객체일 경우, 글자의 기울기를 설정합니다.',
    valids: ['normal', 'italic']
  },

  textAlign: {
    description: '텍스트 객체일 경우, 글자를 정렬합니다.',
    valids: ['left', 'center', 'right']
  },

  width: {
    description: '객체의 너비를 지정합니다.',
    valids: ['0 ~ 𝑛']
  },

  height: {
    description: '객체의 높이를 지정합니다.',
    valids: ['0 ~ 𝑛']
  },

  color: {
    description: '텍스트 객체일 경우, 색상을 지정합니다.',
    valids: []
  },

  textBorderColor: {
    description: '텍스트 객체일 경우, 객체의 테두리 색상을 지정합니다.',
    valids: []
  },

  textShadowColor: {
    description: '텍스트 객체일 경우, 객체의 그림자 색상을 지정합니다.',
    valids: []
  },

  textBorderWidth: {
    description: '텍스트 객체일 경우, 지정한 수치만큼 객체의 테두리를 표시합니다.',
    valids: ['0 ~ 𝑛']
  },

  textShadowBlur: {
    description: '텍스트 객체일 경우, 지정한 수치만큼 객체의 그림자가 번집니다.',
    valids: ['0 ~ 𝑛']
  },

  textShadowOffsetX: {
    description: '텍스트 객체일 경우, 그림자가 표시되는 위치를 지정할 수 있습니다. 이 수치만큼 그림자가 오른쪽으로 비칩니다.',
    valids: ['±𝑛']
  },

  textShadowOffsetY: {
    description: '텍스트 객체일 경우, 그림자가 표시되는 위치를 지정할 수 있습니다. 이 수치만큼 그림자가 아래쪽으로 비칩니다.',
    valids: ['±𝑛']
  },

  blur: {
    description: '이 수치만큼 객체가 번져 보입니다. 흐릿하게 사라져가는 표현을 할 때 좋습니다.',
    valids: ['0 ~ 𝑛']
  },

  pointerEvents: {
    description: '객체를 클릭할 수 있는지 여부를 설정합니다. 허용하지 않으면 뒤에 가려진 다른 객체를 클릭할 수 있게 됩니다.',
    valids: ['true', 'false']
  },

  lineHeight: {
    description: '텍스트 객체일 경우, 줄바꿈 간격을 지정할 수 있습니다.',
    valids: ['0 ~ 𝑛']
  },

  cursor: {
    description: '객체에 마우스를 올렸을 때 보여줄 마우스 커서의 모양을 선택할 수 있습니다.',
    valids: ['auto', 'move', 'pointer', 'grab', 'grabbing', 'help', 'none', 'progress', 'wait', 'zoom-in', 'zoom-out']
  },

  opacity: {
    description: '객체의 투명도를 조절합니다.',
    valids: ['0 ~ 1']
  },

  rotate: {
    description: '객체가 회전된 각도를 지정합니다. 회전은 객체의 \'기준점\' 스타일의 영향을 받습니다.',
    valids: ['±𝑛']
  },

  scale: {
    description: '객체가 너비와 높이의 비례를 유지한 채, 이 수치의 곱만큼 커집니다.',
    valids: ['0 ~ 𝑛']
  },

  zIndex: {
    description: '이 수치가 낮은 다른 객체보다 위에 표시됩니다.',
    valids: ['0 ~ 𝑛']
  }

}