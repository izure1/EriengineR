import createItem from '@static/js/createItem'


export default function (languages, origin, after) {

  let offset
  let returnValue

  offset = languages.indexOf(origin)
  after = createItem(languages, after)

  returnValue = false

  if (offset !== -1) {

    languages[offset] = after
    returnValue = true

  }

  return returnValue

}