import path from 'path'
import assetDirectory from './assetDirectory'

export default async function (asset, relative = false) {

  let directory

  directory = assetDirectory.call(this)
  directory = path.dirname(directory)

  let p

  if (path.isAbsolute(asset)) {
    p = relative ? asset.replace(directory, '') : asset
  } else {
    p = relative ? asset : path.join(directory, asset)
  }

  p = p.split(path.sep).filter(t => !!t)
  p = p.join(path.sep)

  if (relative) {
    p = path.sep + p
  }

  return p

}