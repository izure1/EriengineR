import fs from 'fs-extra'


export default function (file) {

  let content

  try {
    content = fs.readJSONSync(file)
  } catch (e) {
    return null
  }

  return this.createDesignFromContent(content)

}