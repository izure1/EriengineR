export default function () {
  return [{
      alt: '시작',
      description: '에리엔진의 간략한 소개를 봅니다',
      id: 'home',
      icon: 'home',
      select: true,
      hover: false
    },
    {
      alt: '에셋',
      description: '게임에 필요한 에셋을 관리합니다',
      id: 'asset',
      icon: 'insert_drive_file',
      select: false,
      hover: false
    },
    {
      alt: '디자인',
      description: '게임에서 이미지나, 사운드를 사용하기 위해선 먼저 기본 설계를 해야합니다. 이를 디자인이라고 합니다. 게임에 등장하는 모든 것들은 당신이 설계한 디자인의 파생본입니다',
      id: 'design',
      icon: 'person_add',
      select: false,
      hover: false
    },
    {
      alt: '씬',
      description: '게임의 씬을 관리합니다. 인터페이스 배치와 스크립트도 이곳에서 작성합니다. 씬은 역할이나 분류에 따라 자유롭게 나눠쓰세요.',
      id: 'scene',
      icon: 'camera_roll',
      select: false,
      hover: false
    }
  ]
}