import actorAsset from './actorAsset'


export default async function (e, file) {

  let returnValue = await actorAsset.call(this, file)

  e.sender.send('actor-get-asset', returnValue)
  e.returnValue = returnValue

}