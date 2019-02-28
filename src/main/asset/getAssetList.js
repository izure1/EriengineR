import assetList from './assetList'


export default async function (e) {

  let files

  files = await assetList.call(this)

  e.sender.send('asset-get-list', files)
  e.returnValue = files

}