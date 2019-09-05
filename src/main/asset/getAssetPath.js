import assetPath from './assetPath'

export default async function (e, asset) {

  let p
  
  p = await assetPath.call(this, asset, true)

  e.sender.send('asset-get-path', p)
  e.returnValue = p

}