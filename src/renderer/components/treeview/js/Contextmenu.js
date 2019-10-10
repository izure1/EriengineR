import {
  ipcRenderer
} from 'electron'
import path from 'path'
import fs from 'fs-extra'

import createItem from '@common/js/createItem'
import createUID from '@common/js/createUID'




class ContextmenuItem {

  constructor(id = createUID(), text = '새로운 컨텍스트 메뉴') {
    this.id = id
    this.text = text
    this.handler = function () {}
  }

  click(handler) {
    this.handler = handler
    return this
  }

  setOption(option = {}) {
    Object.assign(this, option)
    return this
  }

}


class Contextmenu {

  static createRenameItem() {

    let t = new ContextmenuItem('rename', '이름 바꾸기')

    t.setOption({
      disabledOnTop: true
    })

    t.click(function (e, p, tree) {
      tree.requestModifyName()
    })

    return t

  }

  static createDeleteItem() {

    let t = new ContextmenuItem('delete', '삭제')

    t.setOption({
      disabledOnTop: true
    })

    t.click(function (e, p, tree) {
      tree.requestDeleteItem()
    })

    return t

  }

  static createMakedirItem() {

    let t = new ContextmenuItem('makedir', '새 폴더 만들기')

    t.setOption({
      onlyDirectory: true
    })

    t.click(function (e, directory) {

      let stat
      let name, directorys

      name = '새 폴더'
      directorys = fs.readdirSync(directory)

      name = createItem(directorys, name)
      fs.ensureDir(path.join(directory, name))

    })

    return t

  }

  static createExternalItem() {

    let t = new ContextmenuItem('external', '탐색기에서 열기')

    t.click(function (e, itempath) {
      ipcRenderer.send('shell-show-item-in-folder', itempath)
    })

    return t

  }

  static createSeparatorMenu() {

    let t = new ContextmenuItem(createUID(), '')

    t.setOption({
      separator: true
    })

    return t

  }

  static createDefaultMenus() {

    return [
      Contextmenu.createRenameItem(),
      Contextmenu.createDeleteItem(),
      Contextmenu.createSeparatorMenu(),
      Contextmenu.createMakedirItem(),
      Contextmenu.createSeparatorMenu(),
      Contextmenu.createExternalItem()
    ]

  }

  constructor() {
    this.menu = new Map
  }


  extend(items) {

    if (!Array.isArray(items)) {
      items = [items]
    }

    for (let item of items) {
      this.menu.set(item.id, item)
    }

  }

  render() {

    let contexts

    contexts = this.menu.values()
    contexts = Array.from(contexts)

    return contexts

  }

}


export {
  ContextmenuItem,
  Contextmenu,
}