import process from 'process'


export default function catchError(e) {

  process.on('uncaughtException', e => {

    let {
      message,
      stack
    } = e

    this.webContents.send('send-error', {
      message,
      stack
    })

  })

}