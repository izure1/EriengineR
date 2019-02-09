import {
  remote
} from 'electron'


export default function () {

  this.updateMenu(remote.Menu.buildFromTemplate([]))

}