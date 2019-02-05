import modify from './modify'


export default function (e, origin, after) {

  let returnValue

  returnValue = modify.call(this, origin, after)

  e.sender.send('language-modify', returnValue)
  e.returnValue = returnValue

}