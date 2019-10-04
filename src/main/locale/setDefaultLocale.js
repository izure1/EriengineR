import setDefault from './setDefault'


export default async function (e, name) {

  let returnValue

  returnValue = await setDefault.call(this, name)

  e.sender.send('locale-set-default', returnValue)
  e.returnValue = returnValue

}