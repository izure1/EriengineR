import {
  dialog
} from 'electron'

import del from 'del'

export default async function _delete(e, msg, cb) {

  let deleted
  let res

  res = await dialog.showMessageBox(this, {

    type: 'warning',
    title: '에리엔진',
    message: `${msg.name} 항목을 삭제할까요?`,
    detail: '이 파일은 휴지통에서 복원할 수 없습니다. 계속하시겠습니까?',
    buttons: ['영구히 삭제', '취소'],
    cancelId: -1

  })

  if (res.response === 0) {
    await del(msg.path, {
      force: true
    })
    deleted = true
  }

  e.returnValue = !!deleted

}