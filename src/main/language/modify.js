import createItem from '@static/js/createItem'


export default function (languages, origin, after) {

  let offset
  let ret

  offset = languages.indexOf(origin)
  after = createItem(languages, after)

  ret = false

  if (offset !== -1) {

    languages[offset] = after
    ret = true

  }

  return ret

}