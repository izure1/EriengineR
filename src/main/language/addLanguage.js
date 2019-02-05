import add from './add'


export default function (e, language) {

  add.call(this, language)

  e.sender.send('language-add')
  e.returnValue = null

}