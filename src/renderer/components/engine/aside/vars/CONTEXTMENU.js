import electron from 'electron'
import path from 'path'
import fs from 'fs-extra'

import createItem from '@static/js/createItem'


export default function () {

  return [{
      text: '이름 바꾸기',
      click(e, p, tree) {
        tree.requestModifyName()
      },
      disabledOnTop: true
    },
    {
      text: '삭제',
      click(e, p, tree) {
        tree.requestDeleteItem()
      },
      disabledOnTop: true
    },
    {
      separator: true
    },
    {
      text: '새 폴더 만들기',
      click(e, directory) {

        let stat
        let name, directorys

        stat = fs.lstatSync(directory)

        if (!stat.isDirectory()) {
          directory = path.dirname(directory)
        }

        name = '새 폴더'
        directorys = fs.readdirSync(directory)

        name = createItem(directorys, name)
        fs.mkdir(path.join(directory, name))

      }
    },
    {
      separator: true
    },
    {
      text: '탐색기에서 열기',
      click(e, itempath) {
        electron.shell.showItemInFolder(itempath)
      }
    }
  ]

}