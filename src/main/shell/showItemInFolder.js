import electron from 'electron'


export default function (e, itempath) {

  electron.shell.showItemInFolder(itempath)

  e.sender.send('shell-show-item-in-folder')
  e.returnValue = null

}