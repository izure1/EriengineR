import updateLanguage from './update'
import get from './get'
import fs from 'fs-extra'
import path from 'path'

import createUUID from '@common/js/createUUID'


export default async function (language) {

  let languages = await get.call(this)

  if (languages.filter(item => item.name === language).length === 0) {

    language = path.join(this.variables.project.directory, 'Languages', `${language}.json`)

    fs.writeJSONSync(language, {
      id: createUUID(),
      text: {}
    }, {
      spaces: 2
    })

  }

  updateLanguage.call(this)

}