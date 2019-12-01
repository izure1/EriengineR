import {
  ipcRenderer
} from 'electron'

import fs from 'fs-extra'
import LveJS from 'lve'

import {
  EMPTY_TEXT
} from '../vars/name'


export default function () {

  if (this.lve) {
    this.lve.destroy()
  }

  let sceneId = this.getSceneId()
  // 현재 씬에서 참조하고 있는 모든 에셋을 얻어옵니다
  let assetFiles = ipcRenderer.sendSync('actor-get-asset-list', sceneId)
  // 현재 씬에 있는 모든 액터 파일 경로를 얻어옵니다
  let actorFiles = ipcRenderer.sendSync('actor-get-list', sceneId)


  this.lve = new LveJS
  this.lve.init({
    canvas: this.$el.querySelector('canvas')
  }).setBaseURL(this.actorBaseURL).loadAsset(assetFiles).ready(() => {

    actorFiles.forEach(file => {
      this.drawActorFromPath(file)
    })

    this.drawGuideText()
    this.moveCamera()
    this.zoomCamera()

  })

  window.lve = this.lve

}