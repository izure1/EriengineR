import get from './get'
import ensureDefault from './ensureDefault'


export default async function (old, news) {

  let db, stmt
  let rows

  rows = await get.call(this, news)

  // 이미 존재할 경우
  if (rows) {
    return false
  }

  // 존재하지 않을 경우 이름 변경
  db = this.variables.project.locale.database
  db.run('UPDATE locale SET name = ? WHERE name = ?', [news, old])
  db.save()

  await ensureDefault.call(this)
  return true

}