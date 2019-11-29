import create from './create'


export default async function (e, filepath, actor) {

  let returnValue

  returnValue = await create.call(this, filepath, actor)

  e.sender.send('actor-create', returnValue)
  e.returnValue = returnValue

}