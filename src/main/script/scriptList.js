import fg from 'fast-glob'
import fs from 'fs-extra'
import scriptDirectory from './scriptDirectory'


export default async function (deep = false, cwd = null) {

  let files
  let scripts

  deep = deep ? '**/*.esscript' : '*.esscript'

  scripts = []

  if (cwd === null) {
    cwd = await scriptDirectory.call(this)
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