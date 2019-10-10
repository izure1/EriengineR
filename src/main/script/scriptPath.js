import scriptList from './scriptList'
import scriptDirectory from './scriptDirectory'


export default async function (id) {

  let scripts
  let target
  let cwd

  cwd = await scriptDirectory.call(this)
  scripts = await scriptList.call(this, cwd)
  scripts = scripts.filter(script => script.id === id)

  target = scripts.pop()
  target = target ? target.path : null

  return target

}