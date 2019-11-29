import {
  ipcRenderer
} from 'electron'

import fs from 'fs-extra'
import path from 'path'

import DesignParser from '@game/designs/DesignParser'


export default function (id) {

  let designPath, designOrigin
  let designObj, DesignFactory
  let parser

  // 경로로부터 원본 디자인 정보 JSON을 얻어옵니다
  // 경로로부터 원본 디자인 정보 JSON을 얻어옵니다
  designPath = ipcRenderer.sendSync('design-get-path', id)

  if (!designPath) {
    return null
  }

  designOrigin = fs.readJSONSync(designPath)


  // DesignParser 객체를 이용하여 디자인정보 JSON의 원시 Class 객체를 얻어옵니다
  // 이후 원시 Class를 이용하여 designObj 객체를 만들고, 디자인 정보를 복원합니다.
  parser = new DesignParser
  DesignFactory = parser.getFactoryFromDesign(designOrigin)

  designObj = new DesignFactory
  designObj.from(designOrigin)

  if (designObj.component.attribute && designObj.component.attribute.src) {
    designObj.component.attribute.src = path.join(ipcRenderer.sendSync('project-get-directory'), designObj.component.attribute.src)
  }

  return designObj

}