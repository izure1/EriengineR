import scriptList from './scriptList'


export default async function (id) {

  let scripts
  let target

  scripts = await scriptList.call(this, true)
  scripts = scripts.filter(script => script.id === id)

  target = scripts.pop()
  target = target ? target.path : null

  return target

}