import electron from 'electron'
import fs from 'fs-extra'


export default function (script) {

  let scripts
  let i

  electron.ipcRenderer.send('modal-delete-trash', {
    name: script.id,
    path: script.path
  })

  // 다른 스크립트의 script.nexts 목록에서 해당 스크립트의 script.id를 제거합니다
  for (let item of this.scripts) {

    i = item.nexts.indexOf(script.id)

    if (i === -1) {
      continue
    }

    item.nexts.splice(i, 1)
    this.saveScript(item)

  }

}