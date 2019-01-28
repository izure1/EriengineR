export default function (language = []) {

  let languages

  if (!Array.isArray(language)) {
    language = [language]
  }

  languages = this.variables.project.information.languages
  languages = [...languages, ...language]
  languages = new Set(languages)

  this.variables.project.information.languages = Array.from(languages)

}