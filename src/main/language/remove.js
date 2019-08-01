import path from 'path'
import del from 'del'

import updateLanguage from './update'


export default function (language) {

  let languages

  del.sync(path.posix.join(this.variables.project.directory, 'Languages', `${language}.json`), {
    force: true
  })

  updateLanguage.call(this)

}