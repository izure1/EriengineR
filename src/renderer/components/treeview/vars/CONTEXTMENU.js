import electron from 'electron'
import path from 'path'


export default [{
    text: '이름 바꾸기',
    click(e, before) {
      let t
      this.modifyMode = true
      this.$nextTick(() => {
        t = this.$el.querySelector('input')
        t.value = this.model.name
        t.focus()
        t.setSelectionRange(0, t.value.lastIndexOf('.'))
      })
    },
    disabledOnTop: true
  },
  {
    text: '삭제',
    click(e, itempath) {
      electron.ipcRenderer.send('modal-delete-trash', {
        name: path.basename(itempath),
        path: itempath
      })
    },
    disabledOnTop: true
  },
  {
    separator: true
  },
  {
    text: '탐색기에서 열기',
    click(e, itempath) {
      electron.shell.showItemInFolder(itempath)
    }
  }
]