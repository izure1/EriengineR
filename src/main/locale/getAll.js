export default async function () {

  let db
  let stmt
  let rows

  db = this.variables.project.locale.database
  rows = []

  stmt = db.prepare('SELECT * FROM locale')

  while (stmt.step()) {
    rows.push(stmt.getAsObject())
  }

  stmt.free()
  
  return rows

}