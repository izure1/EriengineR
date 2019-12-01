import path from 'path'
import normalize from 'normalize-path'
import assetDirectory from './assetDirectory'

export default async function (asset, relative = false) {

  let directory

  directory = assetDirectory.call(this)
  directory = path.dirname(directory)
  directory = normalize(directory)

  let p

  if (path.isAbsolute(asset)) {
    p = relative ? asset.replace(directory, '') : asset
  } else {
    p = relative ? asset : path.join(directory, asset)
  }

  p = p.split('/').filter(t => !!t)
  p = p.join('/')

  return p

}