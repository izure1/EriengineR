import updateLanguage from './update'
import get from './get'
import fs from 'fs-extra'
import path from 'path'


export default function (language) {

  let languages = get.call(this)

  if (languages.indexOf(language) === -1) {

    language = path.join(this.variables.project.directory, 'Languages', `${language}.json`)

    fs.writeJSONSync(language, {})

  }

  updateLanguage.call(this)

}