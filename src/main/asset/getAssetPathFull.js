import assetPath from './assetPath'

export default async function (e, asset) {

  let p = await assetPath.call(this, asset, false)

  e.sender.send('asset-get-path-full', p)
  e.returnValue = p

}