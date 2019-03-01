import assetPath from './assetPath'


export default function (e, source) {

  let returnValue

  returnValue = assetPath.call(this, source)

  e.sender.send('asset-get-path', returnValue)
  e.returnValue = returnValue

}