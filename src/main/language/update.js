import fs from 'fs-extra'


export default function (e) {

  fs.writeJSONSync(this.variables.project.information_file, this.variables.project.information, {
    spaces: 2
  })

  e.sender.send('language-update')

}