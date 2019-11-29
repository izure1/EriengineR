import fs from 'fs-extra'


export default function () {

  return fs.existsSync(this.actorPath)

}