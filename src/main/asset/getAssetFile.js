import assetPath from './assetPath'
import assetFile from './assetFile'


export default async function (e, id, relative = false) {

  let returnValue
  let directory

  returnValue = await assetFile.call(this, id)

  if (relative && returnValue) {
    directory = assetPath.call(this)
    returnValue = returnValue.replace(directory, '').substr(1)
  }

  e.sender.send('asset-get-file', returnValue)
  e.returnValue = returnValue

}