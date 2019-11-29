import fg from 'fast-glob'
import actorDirectory from './actorDirectory'


export default async function (id) {

  let files

  files = await fg('**/*.esactor', {
    cwd: actorDirectory.call(this, id),
    absolute: true
  })

  return files

}