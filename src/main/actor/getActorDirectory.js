import actorDirectory from './actorDirectory'


export default function (e, id) {

  let returnValue

  returnValue = actorDirectory.call(this, id)

  e.sender.send('actor-get-directory', returnValue)
  e.returnValue = returnValue

}