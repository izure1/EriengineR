import actorList from './actorList'


export default async function (e, id) {

  let files

  files = await actorList.call(this, id)

  e.sender.send('actor-get-list', files)
  e.returnValue = files

}