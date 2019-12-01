import actorAssetList from './actorAssetList'


export default async function (e, id) {

  let returnValue = await actorAssetList.call(this, id)

  e.sender.send('actor-get-asset-list', returnValue)
  e.returnValue = returnValue

}