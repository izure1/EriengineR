import ensureDefault from './ensureDefault'


export default async function (name) {

  let db

  db = this.variables.project.locale.database

  db.run('DELETE FROM locale WHERE name = ?', [name])
  db.save()

  await ensureDefault.call(this)
  return true

}