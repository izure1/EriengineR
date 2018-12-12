import path from 'path'
import {
  ipcRenderer
} from 'electron'


// PROJECT DIRECTORY\static\assets\project-template
let TEMPLATE = `${__static}/assets/project-template`

export default [{

  name: '비어있는 프로젝트',
  description: '아무것도 들어있지 않은 깨끗한 프로젝트입니다.',
  path: path.join(TEMPLATE, 'Empty')

}, {

  name: '기본 프로젝트',
  description: '초보자를 위한 옵션입니다. <br>비주얼노벨 동작을 위한 최소한의 소스가 작성되어있습니다.',
  path: path.join(TEMPLATE, 'Visualnovel')

}, {

  name: '2D 게임 프로젝트',
  description: '기본적인 2D 물리 효과가 적용되어 있습니다.',
  path: path.join(TEMPLATE, '2D')

}]