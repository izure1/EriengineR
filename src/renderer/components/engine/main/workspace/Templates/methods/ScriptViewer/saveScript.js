import fs from 'fs-extra'

export default function (script) {

  script = this.getOriginScript(script.id)
  fs.writeJSONSync(script.path, script, {
    spaces: 2
  })

}