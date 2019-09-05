import fg from 'fast-glob'
import fs from 'fs-extra'
import scriptPath from './scriptPath'


export default async function (deep = false, cwd = null) {

  let files
  let scripts

  deep = deep ? '**/*.esscript' : '*.esscript'

  scripts = []

  if (cwd === null) {
    cwd = scriptPath.call(this)
  }

  files = await fg(deep, {
    cwd,
    absolute: true
  })


  for (let file of files) {

    let filename

    filename = file

    file = await fs.readJSON(file)
    file.path = filename

    scripts.push(file)

  }

  return scripts

}