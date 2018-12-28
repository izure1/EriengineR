import electron from 'electron'

export default function () {
  return [{
      label: '파일',
      submenu: [{
          label: '저장',
          accelerator: 'CmdOrCtrl + S',
          aftered: true,
          click() {
            electron.ipcMain.emit('save-project')
          }
        },
        {
          type: 'separator'
        },
        {
          label: '내보내기',
          aftered: true,
          submenu: [{
              label: '게임 빌드',
              accelerator: 'CmdOrCtrl + B',
              aftered: true
            },
            {
              type: 'separator'
            },
            {
              label: '모듈 빌드',
              aftered: true
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: '끝내기',
          click(self, win) {
            win.close()
          }
        }
      ]
    },
    {
      label: '데이터',
      submenu: [{
          label: '게임명 수정',
          aftered: true
        },
        {
          label: '해상도 수정',
          aftered: true
        }
      ]
    },
    {
      label: '화면',
      submenu: [{
          label: '플레이 화면',
          submenu: [],
          aftered: true
        },
        {
          label: '시스템 화면',
          submenu: [],
          aftered: true
        },
        {
          type: 'separator'
        },
        {
          label: '새로운 화면 추가',
          aftered: true
        }
      ]
    },
    {
      label: '관리',
      submenu: [{
          label: '키워드 관리',
          aftered: true
        },
        {
          type: 'separator'
        },
        {
          label: '매크로 관리'
        },
        {
          label: '모듈 관리',
          aftered: true
        },
        {
          label: 'JS라이브러리 관리',
          aftered: true
        }
      ]
    },
    {
      label: '보기',
      submenu: [{
          label: '엔진 가이드북',
          click() {
            electron.shell.openExternal('https://cafe.naver.com/lvejs/book5086277')
          }
        },
        {
          label: '엔진 질문/답변',
          click() {
            electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=13&search.boardtype=Q')
          }
        },
        {
          label: '엔진 건의/오류',
          click() {}
        },
        {
          type: 'separator'
        },
        {
          label: '소스 공유 게시판',
          submenu: [{
              label: '배경 이미지',
              click() {
                electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=8')
              }
            },
            {
              label: '캐릭터 이미지',
              click() {
                electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=9')
              }
            },
            {
              label: 'UI 이미지',
              click() {
                electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=10')
              }
            },
            {
              type: 'separator'
            },
            {
              label: '효과음',
              click() {
                electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=11')
              }
            },
            {
              label: '배경음',
              click() {
                electron.shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=12')
              }
            },
            {
              type: 'separator'
            },
            {
              label: '매크로',
              click() {
                electron.shell.openExternal('https://cafe.naver.com/lvejs?iframe_url=/ArticleList.nhn%3Fsearch.clubid=28675793%26search.menuid=26%26search.boardtype=L')
              }
            },
            {
              label: '모듈',
              click() {
                electron.shell.openExternal('https://cafe.naver.com/lvejs?iframe_url=/ArticleList.nhn%3Fsearch.clubid=28675793%26search.menuid=39%26search.boardtype=L')
              }
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: '격자',
          aftered: true
        }
      ]
    },
    {
      label: '정보',
      submenu: [{
          label: '내 정보'
        },
        {
          type: 'separator'
        },
        {
          label: '게임 정보',
          aftered: true
        },
        {
          type: 'separator'
        },
        {
          label: '엔진 정보',
          accelerator: 'CmdOrCtrl + I'
        },
        {
          label: '개발자 센터',
          click() {
            electron.shell.openExternal('http://cafe.naver.com/lvejs')
          }
        }
      ]
    }
  ]
};