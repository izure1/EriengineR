import {
  shell
} from 'electron'


export default function (e, itempath) {

  shell.showItemInFolder(itempath)

  e.sender.send('shell-show-item-in-folder')
  e.returnValue = null

}