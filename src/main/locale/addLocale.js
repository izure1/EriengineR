import add from './add'


export default async function (e, name) {

  let returnValue

  returnValue = await add.call(this, name)

  e.sender.send('locale-add', returnValue)
  e.returnValue = returnValue

}