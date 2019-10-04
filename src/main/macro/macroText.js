export default async function (id) {

  let db, stmt
  let rows

  db = this.variables.project.locale.database

  stmt = db.prepare('SELECT * FROM text WHERE id = ?')

  rows = []
  stmt.bind([id])

  while (stmt.step()) {
    rows.push(stmt.getAsObject())
  }

  stmt.free()

  return rows

}