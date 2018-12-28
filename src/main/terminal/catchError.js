import process from 'process'


export default function catchError(e) {

  process.on('uncaughtException', e => {

    this.webContents.send('send-error', e.toString())

  })

}