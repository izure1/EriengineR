import {
  ipcRenderer
} from 'electron'

import fs from 'fs-extra'


export default function (id) {

  let designPath, designOrigin

  // 경로로부터 원본 디자인 정보 JSON을 얻어옵니다
  // 경로로부터 원본 디자인 정보 JSON을 얻어옵니다
  designPath = ipcRenderer.sendSync('design-get-path', id)

  if (!designPath) {
    return null
  }

  designOrigin = fs.readJSONSync(designPath)


  // DesignParser 객체를 이용하여 디자인정보 JSON의 원시 Class 객체를 얻어옵니다
  // 이후 원시 Class를 이용하여 designObj 객체를 만들고, 디자인 정보를 복원합니다.
  return this.createDesignFromContent(designOrigin)

}