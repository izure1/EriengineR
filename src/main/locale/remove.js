export default async function (name) {

  let db

  db = this.variables.project.locale.database

  db.run('DELETE FROM locale WHERE name = ?', [name])
  db.save()

  return true

}