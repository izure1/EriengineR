import {
  dialog
} from 'electron'

export default async function openModal(e, options = {}) {

  dialog.showOpenDialog(this, options, filepath => {

    e.sender.send('modal-open', filepath)
    e.returnValue = filepath

  })

}