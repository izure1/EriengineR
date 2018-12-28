import {
  dialog
} from 'electron'

import trash from 'trash'


export default async function deleteTrash(e, msg) {

  let btnIndex = dialog.showMessageBox(this, {

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

}