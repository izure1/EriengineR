let attribute = {}


attribute.fontSize = {

  name: '글자 크기',
  description: '텍스트 객체일 경우, 글자의 크기를 지정합니다.'

}

attribute.fontFamily = {

  name: '글꼴',
  description: '텍스트 객체일 경우, 글꼴을 지정합니다. 쉼표로 우선 순위를 지정할 수 있으며, 만일 해당 글꼴을 사용할 수 없으면 다음 글꼴 순서대로 불러옵니다.'

}

attribute.fontWeight = {

  name: '글자 두께',
  description: '텍스트 객체일 경우, 글자의 두께를 지정합니다.',
  list: ['normal', 'bold']

}

attribute.fontStyle = {

  name: '글자 기울기',
  description: '텍스트 객체일 경우, 글자의 기울기를 설정합니다.',
  list: ['normal', 'italic']

}

attribute.textAlign = {

  name: '글자 정렬',
  description: '텍스트 객체일 경우, 글자를 정렬합니다. 좌/우/중앙 정렬이 가능합니다.',
  list: ['left', 'center', 'right']

}

attribute.width = {

  name: '너비',
  description: '객체의 너비를 지정합니다. 숫자, 퍼센테이지, 또는 auto로 지정할 수 있습니다.',
  list: ['auto 입력', 'ｎ% 입력', '숫자 입력']

}

attribute.height = {

  name: '높이',
  description: '객체의 높이를 지정합니다. 숫자, 퍼센테이지, 또는 auto로 지정할 수 있습니다.',
  list: ['auto 입력', 'ｎ% 입력', '숫자 입력']

}

attribute.color = {

  name: '색상',
  description: '객체을 표현할 색상을 지정합니다. RGB, RGBA, HASH 등으로 입력할 수 있습니다.',
  list: ['RGB 입력', 'RGBA 입력', 'HASH 입력']

}

attribute.borderColor = {

  name: '테두리 색상',
  description: '객체의 테두리 색상을 지정합니다. RGB, RGBA, HASH 등으로 입력할 수 있습니다.',
  list: ['RGB 입력', 'RGBA 입력', 'HASH 입력']

}

attribute.shadowColor = {

  name: '그림자 색상',
  description: '객체의 그림자 색상을 지정합니다. RGB, RGBA, HASH 등으로 입력할 수 있습니다.',
  list: ['RGB 입력', 'RGBA 입력', 'HASH 입력']

}

attribute.borderWidth = {

  name: '테두리 두께',
  description: '지정한 수치만큼 객체의 테두리를 표시합니다.'

}

attribute.shadowBlur = {

  name: '그림자 번짐',
  description: '지정한 수치만큼 객체의 그림자가 번집니다.'

}

attribute.shadowOffsetX = {

  name: '그림자 ｘ위치',
  description: '그림자가 표시되는 위치를 지정할 수 있습니다. 이 수치만큼 그림자가 오른쪽으로 비칩니다.'

}

attribute.shadowOffsetY = {

  name: '그림자 ｙ위치',
  description: '그림자가 표시되는 위치를 지정할 수 있습니다. 이 수치만큼 그림자가 아래쪽으로 비칩니다.'

}

attribute.opacity = {

  name: '투명도',
  description: '객체의 투명도를 조절합니다.'

}

attribute.rotate = {

  name: '회전',
  description: '객체가 회전된 각도를 지정합니다. 회전은 객체의 \'기준점\' 스타일의 영향을 받습니다.'

}

attribute.scale = {

  name: '크기',
  description: '객체가 너비와 높이의 비례를 유지한 채, 이 수치만큼 커집니다. 객체의 무게에 영향을 줍니다.'

}

attribute.blur = {

  name: '번짐',
  description: '이 수치만큼 객체가 번져 보입니다. 흐릿하게 사라져가는 표현을 할 때 좋습니다.'

}

attribute.pointerEvents = {

  name: '마우스 입력 허용 여부',
  description: '객체를 클릭할 수 있는지 여부를 설정합니다. 허용하지 않으면 뒤에 가려진 다른 객체를 클릭할 수 있게 됩니다.',
  list: ['true', 'false']

}

attribute.display = {

  name: '보이기',
  description: '객체가 보이는지 여부를 설정합니다. 객체를 숨기면 물리 효과를 받지 않습니다.',
  list: ['block', 'none']

}

attribute.lineHeight = {

  name: '줄바꿈 간격',
  description: '텍스트 객체일 경우, 줄바꿈 간격을 지정할 수 있습니다.',
  list: ['ｎ% 입력', '숫자 입력']

}

attribute.verticalAlign = {

  name: '기준점',
  description: '객체의 좌표가 기준점에 따라 화면에 표시됩니다. \'회전\' 스타일에도 영향을 줍니다.'

}

attribute.zIndex = {

  name: '우선 순위',
  description: '이 수치가 낮은 다른 객체보다 위에 표시됩니다.'

}

attribute.cursor = {

  name: '포인터 커서',
  description: '객체에 마우스를 올렸을 때 보여줄 마우스 커서의 모양을 선택할 수 있습니다.',
  list: ['auto', 'move', 'pointer', 'grab', 'grabbing', 'help', 'none', 'progress', 'wait', 'zoom-in', 'zoom-out']

}


export default attribute