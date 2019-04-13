import path from 'path'
import fs from 'fs-extra'

import find from './find'
import assetPath from '../asset/assetPath'


function cannotFound(e) {

  e.sender.send('design-get-asset-path', null)
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

  returnValue = await assetPath.call(this, design.__asset)

  e.sender.send('design-get-asset-path', returnValue)
  e.returnValue = returnValue

}