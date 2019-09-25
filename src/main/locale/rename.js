import get from './get'


export default async function (old, news) {

  let db, stmt
  let rows

  rows = await get.call(this, news)

  // 이미 존재할 경우
  if (Object.keys(rows).length) {
    return false
  }

  // 존재하지 않을 경우 이름 변경
  db = this.variables.project.locale.database
  db.run('UPDATE locale SET name = ? WHERE name = ?', [news, old])
  db.save()

  return true

}