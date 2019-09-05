import path from 'path'
import del from 'del'

import updateLanguage from './update'


export default function (language) {

  let languages
  let p

  p = path.join(this.variables.project.directory, 'Languages', `${language}.json`)

  del.sync(p, {
    force: true
  })

  updateLanguage.call(this)

}