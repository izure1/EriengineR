import fs from 'fs-extra'
import fg from 'fast-glob'
import assetDirectory from './assetDirectory'


async function readAssetData(filepath) {

  return new Promise(async (resolve, reject) => {

    try {
      resolve(await fs.readJSON(filepath))
    } catch (e) {
      reject(e)
    }

  })

}

export default async function (e) {

  let files
  let data

  data = {}
  files = await fg('**/*', {
    cwd: assetDirectory.call(this),
    absolute: true
  })

  for (let file of files) {
    try {
      data[file] = await readAssetData(file)
    } catch (e) {
      throw e
    }
  }

  return data

}