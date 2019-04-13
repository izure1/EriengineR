import assetDirectory from './assetDirectory'


export default function (e, source) {

  let returnValue

  returnValue = assetDirectory.call(this, source)

  e.sender.send('asset-get-directory', returnValue)
  e.returnValue = returnValue

}