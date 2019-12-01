import {
  ipcRenderer
} from 'electron'
import path from 'path'
import normalize from 'normalize-path'
import getMouseOffset from '@common/js/getMouseOffset'
import Script from '@common/js/Script'


export default function (e) {

  if (this.connection.source) {
    this.cancelConnecting()
    return
  }

  let x, y, o
  let script
  let scriptname

  o = getMouseOffset(e)
  x = o.x
  y = o.y

  script = new Script
  script.setPosition(x, y)
  scriptname = normalize(path.join(this.data.directory, script.id))
  scriptname += '.esscript'

  // 해당 디렉토리에 새로운 스크립트 파일을 만듭니다. 이는 화면에 자동으로 갱신됩니다
  ipcRenderer.sendSync('script-write', scriptname, script)

}