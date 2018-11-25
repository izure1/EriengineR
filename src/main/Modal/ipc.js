import {
  ipcMain,
  dialog
} from 'electron'

import trash from 'trash'
import del from 'del'


export default function (win) {

  ipcMain.on('modal-delete-trash', async function (e, msg) {

    let btnIndex = dialog.showMessageBox(win, {

      type: 'question',
      title: '에리엔진',
      message: `${msg.name} 항목을 삭제할까요?`,
      detail: '휴지통에서 복원할 수 있습니다.',
      buttons: ['휴지통으로 이동', '취소'],
      cancelId: -1

    })

    if (btnIndex === 0) {
      await trash(msg.path)
    }

  })

  ipcMain.on('model-delete', async function (e, msg) {

    let btnIndex = dialog.showMessageBox(win, {

      type: 'warning',
      title: '에리엔진',
      message: `${msg.name} 항목을 삭제할까요?`,
      detail: '이 파일은 휴지통에서 복원할 수 없습니다. 계속하시겠습니까?',
      buttons: ['영구히 삭제', '취소'],
      cancelId: -1

    })

    if (btnIndex === 0) {
      await del(msg.path)
    }

  })


  ipcMain.on('modal-open-sync', async function (e, options = {}) {

    e.returnValue = dialog.showOpenDialog(win, options)

  })

}