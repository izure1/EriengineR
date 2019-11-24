import fs from 'fs-extra'


export default function () {

  this.scripts = this.getScriptData(this.data.directory)

  // 해당 폴더의 내용물이 변경될 경우, 자동으로 감지하여 스크립트 목록을 갱신합니다
  this.watcher = fs.watch(this.data.directory, (e, filename) => {

    this.scripts = this.getScriptData(this.data.directory)
    this.setJsPlumbBox()

  })

}