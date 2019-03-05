import write from './write'


export default async function (e, path, content) {

  let returnValue

  returnValue = await write.call(this, path, content)

  e.sender.send('script-write', returnValue)
  e.returnValue = returnValue

}