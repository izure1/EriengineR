import path from 'path'
import fs from 'fs-extra'

import {
  dialog
} from 'electron'


// PROJECT DIRECTORY\static\assets\default-workspace
const DEFAULT_WORKSPACE = `${__static}/assets/default-workspace`

export default {

  /**
   * 
   * @param {String} directoryPath 기본 디렉토리 경로
   * @returns {JSON} 엔진의 정보를 담은 객체
   * @description
   * 에리엔진의 기본 디렉토리를 초기화합니다. 이미 생성되었다면 무시합니다.
   */
  async init(directoryPath) {

    let src
    let dist

    src = DEFAULT_WORKSPACE
    dist = directoryPath
    dist = path.join(dist, '.eriengine')

    try {

      await fs.copy(src, dist, {
        overwrite: false
      })

    } catch (e) {
      dialog.showErrorBox(e.message, e.stack)
      return
    }


    return {
      directory: dist,
      user: path.join(dist, 'user.json')
    }

  },

  async getUserData(user) {

    return await fs.readJSON(user)

  }

}