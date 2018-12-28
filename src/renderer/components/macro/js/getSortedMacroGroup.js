export default function getSortedMacroGroup(macros) {

  let classes

  classes = {}

  for (let macro of macros) {

    if (!(macro.class in classes)) {
      classes[macro.class] = []
    }

    classes[macro.class].push(macro)

  }

  return classes

}