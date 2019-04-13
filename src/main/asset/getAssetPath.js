import assetDirectory from './assetDirectory'
import assetPath from './assetPath'


export default async function (e, id, relative = false) {

  let returnValue
  let directory

  returnValue = await assetPath.call(this, id)

  if (relative && returnValue) {
    directory = assetDirectory.call(this)
    returnValue = returnValue.replace(directory, '').substr(1)
  }

  e.sender.send('asset-get-path', returnValue)
  e.returnValue = returnValue

}