import get from './get'
import getDefault from './getDefault'
import ensureDefault from './ensureDefault'


export default async function (name) {

  let db
  let rows

  db = this.variables.project.locale.database

  rows = await get.call(this, name)

  // 존재하지 않는 언어로 시도할 경우, null 을 반환
  if (!rows) {
    return null
  }

  db.run('UPDATE locale SET def = 0')
  db.run('UPDATE locale SET def = 1 WHERE name = ?', [name])
  db.save()

  await ensureDefault.call(this)
  return await getDefault.call(this)

}