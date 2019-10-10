import unrunableList from './unrunableList'


export default async function (e, cwd, deep) {

  let returnValue

  returnValue = await unrunableList.call(this, cwd, deep)

  e.sender.send('script-get-list-unrunable', returnValue)
  e.returnValue = returnValue

}