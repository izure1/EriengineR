import fs from 'fs-extra'


export default async function (path, content) {

  delete content.path

  await fs.writeJSON(path, content, {
    spaces: 2
  })

  return true

}