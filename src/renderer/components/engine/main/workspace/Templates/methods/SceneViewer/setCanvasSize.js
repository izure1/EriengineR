import electron from 'electron'


export default function () {

  let {
    width = 0,
    height = 0
  } = electron.ipcRenderer.sendSync('var-get-sync', 'project.information')

  this.canvasWidth = width
  this.canvasHeight = height

}