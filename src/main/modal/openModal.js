import {
  dialog
} from 'electron'

export default function openModal(e, options = {}) {

  e.returnValue = dialog.showOpenDialog(this, options)

}