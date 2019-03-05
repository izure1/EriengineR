import scriptPath from './scriptPath'


export default function (e) {

  let returnValue

  returnValue = scriptPath.call(this)

  e.sender.send('script-get-path', returnValue)
  e.returnValue = returnValue

}