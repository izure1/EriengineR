import path from 'path'
import fs from 'fs-extra'

import find from './find'
import assetFile from '../asset/assetFile'


function cannotFound(e) {

  e.sender.send('design-get-asset-file', null)
  e.returnValue = null

}

export default async function (e, id) {

  let design
  let returnValue

  design = await find.call(this, id)

  if (!design) {
    cannotFound(e)
    return
  }

  design = await fs.readJSON(design)

  if (!design.__asset) {
    cannotFound(e)
    return
  }

  returnValue = await assetFile.call(this, design.__asset)

  e.sender.send('design-get-asset-file', returnValue)
  e.returnValue = returnValue

}