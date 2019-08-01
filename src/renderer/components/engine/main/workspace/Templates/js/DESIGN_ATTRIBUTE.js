let attribute = {}

attribute.className = {

  name: '카테고리',
  description: '객체의 카테고리를 지정할 수 있습니다. 여러개의 카테고리를 지정하고 싶다면, 띄어쓰기로 구분하세요.'

}

attribute.loop = {

  name: '반복',
  description: '미디어, 스프라이트 객체일 경우 재생이 끝나면 자동으로 반복할지 지정합니다.',
  list: ['false', 'true']

}

attribute.text = {

  name: '글 내용',
  description: '텍스트 객체일 경우, 이 글자가 보여집니다.'

}

attribute.timescale = {

  name: '시간 지연',
  description: '이 객체에 흐르는 시간의 속도를 결정합니다. 재생 속도나, 애니메이션 속도에 영향을 주지만, 물리 효과는 영향을 받지 않습니다.',
  list: ['0 ~ 𝑛']

}

attribute.physics = {

  name: '물리 효과',
  description: '이 객체가 물리 효과를 받는지 여부를 결정합니다.',
  list: ['null', 'static', 'dynamic']

}

attribute.density = {

  name: '질량',
  description: '객체의 무게는 부피와 질량에 비례합니다. 만일 부피는 유지하고, 무게를 변경하고 싶다면 이 수치를 조절하십시오.',
  list: ['0 ~ 𝑛']

}

attribute.friction = {

  name: '마찰력',
  description: '가령 얼음을 표현하고 싶다면 이 수치를 낮게 조절하십시오.',
  list: ['0 ~ 𝑛']

}

attribute.restitution = {

  name: '탄성',
  description: '객체가 다른 객체에 부딪쳐 튕겨나올 때 어느정도의 탄성을 가지는지 지정합니다.',
  list: ['0 ~ 𝑛']

}

attribute.fixedrotation = {

  name: '회전 여부',
  description: '객체가 물리 효과를 받았을 때, 회전하는 것을 허락할지 결정합니다.',
  list: ['false', 'true']

}

attribute.gravityscale = {

  name: '중력 비중',
  description: '지정된 수치만큼 더 강한 중력을 받습니다.',
  list: ['±𝑛']

}

attribute.movementscale = {

  name: '좌표 비율',
  description: '객체의 𝑥, 𝑦, 𝑧 좌표가 변경될 때, 이 수치의 곱만큼 더 움직입니다.',
  list: ['±𝑛']

}

attribute.sprite_playing = {

  name: '스프라이트 재생 여부',
  description: '스프라이트 객체일 때, 스프라이트를 재생할지 결정합니다.',
  list: ['false', 'true']

}

attribute.sprite_stage = {

  name: '스프라이트 프레임 개수',
  description: '스프라이트 객체일 때, 이미지 에셋 안에 몇 개의 프레임이 있는지 입력하세요. 잘못 입력하면 이상한 모양으로 보입니다.',
  list: ['1 ~ 𝑛']

}

attribute.sprite_fps = {

  name: '스프라이트 재생 속도',
  description: '스프라이트 객체일 때, 초당 프레임 재생 속도를 입력합니다. 가령 1초에 스프라이트를 전부 재생하고 싶다면, 스프라이트 프레임 개수와 똑같이 입력해주세요.',
  list: ['0 ~ 𝑛']

}

attribute.sprite_current = {

  name: '스프라이트 프레임',
  description: '스프라이트 객체일 때, 현재 스프라이트 프레임 위치를 설정합니다.',
  list: ['0 ~ 𝑛']

}

attribute.video_playbackRate = {

  name: '미디어 재생 속도',
  description: '미디어 객체일 때, 재생 속도를 설정합니다.',
  list: ['0 ~ 2']

}

attribute.video_currentTime = {

  name: '미디어 현재 위치',
  description: '미디어 객체일 때, 현재 위치(초)를 지정합니다.',
  list: ['0 ~ 𝑛']

}

attribute.video_volume = {

  name: '미디어 볼륨',
  description: '미디어 객체일 때, 볼륨 크기를 설정합니다.',
  list: ['0 ~ 1']

}

attribute.video_muted = {

  name: '미디어 음소거 설정',
  description: '미디어 객체일 때, 음소거 여부를 설정합니다.',
  list: ['false', 'true']

}


export default attribute