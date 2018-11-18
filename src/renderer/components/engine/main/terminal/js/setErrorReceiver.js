import electron from 'electron'

import Receiver from './Receiver'

export default function (el) {
  let alertor
  let receiver

  alertor = document.querySelector('.terminal-alertor-error')
  receiver = new Receiver(el, alertor)

  electron.ipcRenderer.on('send-error', (e, msg) => {
    receiver.print(msg.user, msg.content, 'terminal-container-errortext')
  })
};
