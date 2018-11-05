export default [{
  label: '파일',
  submenu: [{
    label: '새로운 프로젝트'
  },
  {
    label: '열기'
  },
  {
    label: '저장'
  },
  {
    type: 'separator'
  },
  {
    label: '종료',
    click (self, win, e) {
      win.close()
    }
  }
  ]
}]
