import get from './get'


export default async function(e, name){

  let returnValue

  returnValue = await get.call(this, name)

  e.sender.send('locale-get', returnValue)
  e.returnValue = returnValue

}