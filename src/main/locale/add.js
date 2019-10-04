import createUID from '@common/js/createUID'
import get from './get'
import ensureDefault from './ensureDefault'


export default async function (name) {

  let rows

  rows = await get.call(this, name)

  // 검색된 결과가 없을 경우
  if (!rows) {

    let id
    let db, stmt

    id = createUID()
    db = this.variables.project.locale.database

    db.run('INSERT INTO locale VALUES(?, ?, 0)', [id, name])

    stmt = db.prepare('SELECT * from locale WHERE name = ?')
    rows = stmt.getAsObject([name])

    stmt.free()
    db.save()

  }

  await ensureDefault.call(this)
  return rows

}