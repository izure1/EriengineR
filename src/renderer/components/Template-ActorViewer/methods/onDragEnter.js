import fs from 'fs-extra'
import path from 'path'


function isDesignFile(filepath) {

  return path.extname(filepath) === '.esdesign'

}

export default function (e, dataTransfer) {

  let file = dataTransfer.getData('text/path')

  if (!file) {
    return
  }

  if (!isDesignFile(file)) {
    return
  }

  let design

  try {
    design = fs.readJSONSync(file)
  } catch (e) {
    return
  }

  dataTransfer.setData('text/actor-design-id', design.id)

  this.createPreviewActor(e, dataTransfer)

}