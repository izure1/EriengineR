export default async function (name) {

  let db, stmt
  let rows

  db = this.variables.project.locale.database

  stmt = db.prepare('SELECT * FROM locale WHERE name = ?')
  rows = stmt.getAsObject([name])

  stmt.free()

  if (!Object.keys(rows).length) {
    rows = null
  }

  return rows

}