import {
  ipcRenderer
} from 'electron'

export default function () {

  if (!this.isImageFile && !this.isVideoFile) {
    return
  }

  return ipcRenderer.sendSync('asset-get-path-full', this.path)

}