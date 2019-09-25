import rename from './rename'


export default async function (e, old, news) {

  let returnValue

  returnValue = await rename.call(this, old, news)

  e.sender.send('locale-rename', returnValue)
  e.returnValue = returnValue

}