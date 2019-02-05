import {
  remote,
  shell
} from 'electron'

const {
  dialog
} = remote


export default function () {
  return [{
      label: '파일',
      submenu: [{
          label: '저장',
          accelerator: 'CmdOrCtrl + S',
          click() {
            //electron.ipcMain.emit('save-project')
          }
        },
        {
          type: 'separator'
        },
        {
          label: '내보내기',
          submenu: [{
              label: '게임 빌드',
              accelerator: 'CmdOrCtrl + B'
            },
            {
              type: 'separator'
            },
            {
              label: '모듈 빌드'
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
          label: '게임명 수정'
        },
        {
          label: '해상도 수정'
        }
      ]
    },
    {
      label: '관리',
      submenu: [{
          label: '다국어 관리',
          click(self, win) {
            win.webContents.send('vue-emit', ['createWorkspaceTab', 'language-manager', `다국어 관리자`, 'LANGUAGE-MANAGER'])
          }
        },
        {
          type: 'separator'
        },
        {
          label: '매크로 관리'
        },
        {
          label: '모듈 관리'
        },
        {
          label: 'JS라이브러리 관리'
        }
      ]
    },
    {
      label: '보기',
      submenu: [{
          label: '엔진 가이드북',
          click() {
            shell.openExternal('https://cafe.naver.com/lvejs/book5086277')
          }
        },
        {
          label: '엔진 질문/답변',
          click() {
            shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=13&search.boardtype=Q')
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
                shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=8')
              }
            },
            {
              label: '캐릭터 이미지',
              click() {
                shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=9')
              }
            },
            {
              label: 'UI 이미지',
              click() {
                shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=10')
              }
            },
            {
              type: 'separator'
            },
            {
              label: '효과음',
              click() {
                shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=11')
              }
            },
            {
              label: '배경음',
              click() {
                shell.openExternal('http://cafe.naver.com/ArticleList.nhn?search.clubid=28675793&search.menuid=20&search.boardtype=L&userDisplay=15&search.headid=12')
              }
            },
            {
              type: 'separator'
            },
            {
              label: '매크로',
              click() {
                shell.openExternal('https://cafe.naver.com/lvejs?iframe_url=/ArticleList.nhn%3Fsearch.clubid=28675793%26search.menuid=26%26search.boardtype=L')
              }
            },
            {
              label: '모듈',
              click() {
                shell.openExternal('https://cafe.naver.com/lvejs?iframe_url=/ArticleList.nhn%3Fsearch.clubid=28675793%26search.menuid=39%26search.boardtype=L')
              }
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: '격자'
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
          label: '게임 정보'
        },
        {
          type: 'separator'
        },
        {
          label: '엔진 정보',
          accelerator: 'CmdOrCtrl + I',
          click(self, win) {
            dialog.showMessageBox({
              type: 'info',
              title: '에리엔진',
              message: '에리엔진',
              detail: `버전: ${win.variables.package.version}\n제작: ${win.variables.package.author}\n라이센스: ${win.variables.package.license}`
            })
          }
        },
        {
          label: '개발자 센터',
          click() {
            shell.openExternal('http://cafe.naver.com/lvejs')
          }
        }
      ]
    }
  ]
};