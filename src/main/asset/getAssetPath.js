import assetPath from './assetPath'


export default function (e) {

  let returnValue

  returnValue = assetPath.call(this)

  e.sender.send('asset-get-path', returnValue)
  e.returnValue = returnValue

}