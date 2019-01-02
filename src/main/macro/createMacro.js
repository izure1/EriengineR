import createUUID from '@static/js/createUUID'


export default function createMacro(e, column) {

  let lid
  let variables

  lid = createUUID()
  variables = {}


  this.variables.macro = {
    lid,
    variables: {},
    column
  }

  e.sender.send('macro-create')

}