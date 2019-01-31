import path from 'path'
import fs from 'fs-extra'
import glob from 'glob'


export default function getMacroList(e) {

  let macroDirectory
  let macro


  macroDirectory = path.join(__static, 'assets', 'macro')
  macro = {}

  // macro 폴더 내에 있는 모든 매크로를 불러옵니다
  for (let dirname of fs.readdirSync(macroDirectory)) {

    let dir
    let m

    dir = path.join(macroDirectory, dirname, '**/*.js')
    dir = glob.sync(dir)
    dir = dir.map(path => {

      m = __non_webpack_require__(path)
      m.path = path

      return m

    })

    macro[dirname] = dir

  }

  e.sender.send('macro-get-list', macro)
  e.returnValue = macro

}