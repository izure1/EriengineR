import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'


export default async function () {

  let macroDirectory
  let macro


  macroDirectory = path.join(this.variables.project.directory, 'Mods', 'Macro')
  macro = {}

  // macro 폴더 내에 있는 모든 매크로를 불러옵니다
  for (let dirname of fs.readdirSync(macroDirectory)) {

    let dir
    let m

    dir = path.join(macroDirectory, dirname)
    dir = fg.sync('**/*.js', {
      cwd: dir,
      absolute: true
    })
    dir = dir.map(path => {

      m = __non_webpack_require__(path)
      m.path = path

      return m

    })

    macro[dirname] = dir

  }

  return macro

}