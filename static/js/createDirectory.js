import fs from 'fs-extra'
import path from 'path'


export default function createDirectory(directory, count = 0) {

  let stat
  let dirpath

  dirpath =
    count ?
    directory + ` (${count})` :
    directory

  if (fs.existsSync(dirpath)) {

    createDirectory(directory, ++count)

  } else {

    fs.mkdirSync(dirpath)

  }

}