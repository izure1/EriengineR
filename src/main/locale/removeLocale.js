import remove from './remove'


export default async function (e, name) {

  let returnValue

  returnValue = await remove.call(this, name)

  e.sender.send('locale-remove', returnValue)
  e.returnValue = returnValue

}