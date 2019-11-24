import {
  ipcRenderer
} from 'electron'
import Macro from '@common/js/Macro'


export default function (macroInfo) {

  let origin
  let description

  origin = ipcRenderer.sendSync('macro-get-information', macroInfo.origin)
  description = origin.description

  if (!description) {
    return ''
  }


  let macro

  macro = new Macro
  macro.parseFromInformation(macroInfo)
  macro.lists = origin.lists

  return macro.parseDescription(description)

}