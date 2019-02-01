export default function (e, msg) {

  let {
    languages
  } = this.variables.project.information

  e.sender.send('language-get', languages)
  e.returnValue = languages

}