import createItem from '@static/js/createItem'
import updateLanguage from './update'

import get from './get'
import rename from './rename'


export default async function (origin, after) {

  let languages
  let returnValue
  let offset

  languages = await get.call(this)
  languages = languages.map(language => language.name)

  offset = languages.indexOf(origin)
  after = createItem(languages, after)

  returnValue = false

  if (offset !== -1) {

    returnValue = true
    rename.call(this, origin, after)

  }

  updateLanguage.call(this)

  return returnValue

}