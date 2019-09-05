import path from 'path'
import fs from 'fs-extra'

import {
  dialog
} from 'electron'

import subDirectory from './subDirectory'


export default async function (e, options) {

  let src
  let dist, esproject
  let success

  src = options.template.path
  dist = path.join(options.directory, options.id)
  esproject = path.join(dist, 'project.esproject')

  // 쓸모없는 정보를 삭제합니다
  delete options.directory
  delete options.template


  // 프로젝트 디렉토리를 생성합니다
  try {

    // static/assets/projecTemplate 디렉토리에 있는 샘플 디렉토리를 복사하고
    // 프로젝트 정보를 담은 project.esproject 파일을 생성합니다
    await fs.copy(src, dist)
    await fs.writeJSON(esproject, options, {
      spaces: 2
    })


    // 서브 디렉토리 생성하기
    // 서브 디렉토리 목록은 ./Vars/DIRECTORYS.js 에서 관리할 수 있습니다
    await subDirectory(dist)

    success = true

  } catch (err) {

    success = false
    dialog.showErrorBox(err.message, err.stack)

  }


  let ret = {
    success,
    esproject
  }

  e.sender.send('project-create', ret)
  e.returnValue = ret

}