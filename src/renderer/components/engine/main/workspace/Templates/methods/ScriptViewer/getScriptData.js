import electron from 'electron'
import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'


export default function () {

  let scripts


  scripts = glob.sync('*.esscript', {
    cwd: this.data.directory,
    nodir: true
  })

  // 데이터로 받은 스크립트 파일 경로로부터 스크립트 목록을 만듭니다
  scripts = scripts.map(filename => {

    let filepath
    let filedata

    filepath = path.join(this.data.directory, filename)
    filedata = fs.readJSONSync(filepath)

    Object.defineProperty(filedata, 'path', {
      value: filepath
    })

    return filedata

  })

  return scripts

}