import fs from 'fs-extra'
import path from 'path'
import Actor from '@common/js/Actor'


export default function () {

  let content
  let actor

  try {
    content = fs.readJSONSync(this.path)
  } catch (e) {
    return null
  }

  actor = new Actor
  actor.from(content)

  return actor

}