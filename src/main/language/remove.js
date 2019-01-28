export default function (language = []) {

  let languages
  let lan

  if (!Array.isArray(language)) {
    language = [language]
  }


  languages = this.variables.project.information.languages

  for (let i = 0, len = language.length, offset; i < len; i++) {

    lan = language[i]
    offset = languages.indexOf(lan)

    if (offset === -1) {
      continue
    }

    languages.splice(offset, 1)

  }

}