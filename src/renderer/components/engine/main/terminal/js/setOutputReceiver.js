import electron from 'electron'

import Receiver from './Receiver'

export default function (el) {
  let alertor
  let receiver

  alertor = document.querySelector('.terminal-alertor-output')
  receiver = new Receiver(el, alertor)

  electron.ipcRenderer.on('send-output', (e, msg) => {
    receiver.print(msg.user, msg.content, 'terminal-container-outtext')
  })
};