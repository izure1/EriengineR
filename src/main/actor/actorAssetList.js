import actorList from './actorList'
import actorAsset from './actorAsset'


export default async function (id) {

  let files = await actorList.call(this, id)

  let contents = []
  for (let file of files) {
    let content = await actorAsset.call(this, file)
    contents.push(content)
  }

  contents = contents.filter(content => !!content)
  contents = Array.from(new Set(contents))

  return contents.filter(content => !!content)

}