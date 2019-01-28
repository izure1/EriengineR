export default function (e, msg) {

  e.sender.send('language-get', this.variables.project.information.languages)

}