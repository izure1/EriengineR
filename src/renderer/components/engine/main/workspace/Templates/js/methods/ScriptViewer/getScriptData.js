import electron from 'electron'
import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'


export default function () {

  let scripts
  let failed


  scripts = glob.sync('*.esscript', {
    cwd: this.data.directory,
    nodir: true
  })

  // 데이터로 받은 스크립트 파일 경로로부터 스크립트 목록을 만듭니다
  scripts = scripts.map(filename => {

    let filepath
    let filedata

    try {

      filepath = path.join(this.data.directory, filename)
      filedata = fs.readJSONSync(filepath)

      Object.defineProperty(filedata, 'path', {
        value: filepath
      })

    } catch (e) {
      failed = e.toString()
      return {}
    }

    return filedata

  })

  // 스크립트 파일이 없거나 문제가 있을 때 에러를 발생하고 작업을 중지합니다
  if (failed) {

    electron.ipcRenderer.send('send-error', {
      user: 'Script',
      content: failed
    })

    return

  }

  return scripts

}