import path from 'path'
import normalize from 'normalize-path'
import fs from 'fs-extra'

import createItem from '@common/js/createItem'
import Script from '@common/js/Script'


export default function (filepath) {

  let dir
  let files, file
  let context, script

  dir = path.dirname(filepath)
  files = fs.readdirSync(dir).map(t => path.parse(t).name)

  file = createItem(files, path.parse(filepath).name)
  file = normalize(path.join(dir, file))
  file += `.${path.parse(filepath).ext}`

  context = fs.readJSONSync(filepath)
  
  script = new Script
  script.parseFromInformation(context)
  script = script.copy()

  script.position.x += 30
  script.position.y += 30

  fs.writeJSONSync(file, script, {
    spaces: 2
  })

}