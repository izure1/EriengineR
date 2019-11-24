import {
  dialog
} from 'electron'

export default async function openModal(e, options = {}) {

  let returnValue
  let res

  res = await dialog.showOpenDialog(this, options)
  returnValue = res.canceled ? null : res.filePaths

  e.sender.send('modal-open', returnValue)
  e.returnValue = returnValue

}