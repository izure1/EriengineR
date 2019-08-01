import path from 'path'
import fg from 'fast-glob'

import scriptPath from './scriptPath'
import scriptList from './scriptList'
import write from './write'


function getNotExistItem(nexts, items) {

  let notExists

  notExists = []
  items = items.map(item => item.id)

  for (let next of nexts) {

    if (items.indexOf(next) !== -1) {
      continue
    }

    notExists.push(next)

  }

  return notExists

}


export default async function () {

  let directorys

  directorys = await fg('**/', {
    cwd: scriptPath.call(this),
    onlyDirectories: true,
    absolute: true
  })

  directorys = [scriptPath.call(this), ...directorys]


  let files
  let scripts
  let directoryMap, directoryItems

  directoryMap = new Map
  scripts = []


  for (let directory of directorys) {

    directory = path.posix.join(directory)

    if (!directoryMap.has(directory)) {
      directoryMap.set(directory, [])
    }

    directoryItems = directoryMap.get(directory)

    files = await scriptList.call(this, false, directory)
    scripts = [...scripts, ...files]

    directoryMap.set(directory, [...directoryItems, ...files])

  }

  for (let script of scripts) {

    let dir
    let notExists

    dir = path.dirname(script.path)
    dir = path.posix.join(dir)

    notExists = getNotExistItem(script.nexts, directoryMap.get(dir))


    let id
    let i

    i = notExists.length

    while (i--) {
      id = notExists[i]
      script.nexts.splice(script.nexts.indexOf(id), 1)
    }

    await write.call(this, script.path, script)

  }

}