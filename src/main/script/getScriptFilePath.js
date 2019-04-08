import scriptFilePath from './scriptFilePath'


export default async function (e, id) {

  let returnValue

  returnValue = await scriptFilePath.call(this, id)

  e.sender.send('script-get-filepath', returnValue)
  e.returnValue = returnValue

}