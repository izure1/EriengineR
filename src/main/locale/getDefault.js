export default async function () {

  let db, stmt
  let rows

  db = this.variables.project.locale.database

  stmt = db.prepare('SELECT * FROM locale WHERE def = 1')
  stmt.step()
  rows = stmt.getAsObject()
  stmt.free()

  if (!Object.keys(rows).length) {
    rows = null
  }

  return rows

}