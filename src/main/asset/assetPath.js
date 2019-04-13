import assetDirectory from './assetDirectory'
import assetList from './assetList'


export default async function (id) {

  let directory
  let filelist, file

  directory = await assetDirectory.call(this)
  filelist = await assetList.call(this)

  for (let p in filelist) {

    file = filelist[p]

    if (file.id === id) {
      return p
    }

  }

  return null

}