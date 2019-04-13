import assetFile from './assetFile'


export default async function (e, id) {

  let returnValue
  let directory

  returnValue = await assetFile.call(this, id)

  e.sender.send('asset-get-file', returnValue)
  e.returnValue = returnValue

}