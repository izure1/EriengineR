import fg from 'fast-glob'
import assetDirectory from './assetDirectory'

export default async function (e) {

  let files

  files = await fg('**/*', {
    cwd: assetDirectory.call(this),
    absolute: true
  })

  return files

}