import fs from 'fs-extra'


export default async function (filepath, actor) {

  await fs.writeJSON(filepath, actor, {
    spaces: 2
  })
  
  return filepath

}