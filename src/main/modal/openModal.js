import {
  dialog
} from 'electron'

export default async function openModal(e, options = {}) {

  e.returnValue = dialog.showOpenDialog(this, options)

}