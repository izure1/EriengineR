import getAll from './getAll'


export default async function (e) {

  let returnValue

  returnValue = await getAll.call(this)

  e.sender.send('locale-get-all', returnValue)
  e.returnValue = returnValue

}