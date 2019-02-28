import glob from 'glob'
import fs from 'fs-extra'
import assetPath from './assetPath'



async function getAssets(pattern, option) {

  return new Promise((resolve, reject) => {
    glob(pattern, option, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })

}

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

  let cwd, opt
  let files

  cwd = assetPath.call(this)
  opt = {
    cwd,
    nodir: true,
    absolute: true
  }


  let data = {}

  files = await getAssets('**/*', opt)

  for (let file of files) {
    try {
      data[file] = await readAssetData(file)
    } catch (e) {
      throw e
    }
  }

  return data

}