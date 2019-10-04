import macroText from './macroText'


export default async function (id, type, content, locale) {

  let db, stmt
  let exists

  db = this.variables.project.locale.database

  stmt = db.prepare('SELECT * FROM text WHERE id = ? AND locale = ?')

  exists = stmt.getAsObject([id, locale])
  exists = !!Object.keys(exists).length

  stmt.free()

  // 이미 존재할 경우, 업데이트 하기
  if (exists) {

    db.run('UPDATE text SET content = ? WHERE id = ? AND locale = ?', [content, id, locale])
    db.save()

  }
  // 존재하지 않을 경우 데이터베이스에 넣기
  else {

    db.run('INSERT INTO text VALUES(?, ?, ?, ?)', [id, type, content, locale])
    db.save()

  }


  // 방금 등록한 텍스트 반환하기
  // 가장 마지막에 등록되어 있기 때문에 pop 으로 꺼내옵니다
  let v

  v = await macroText.call(this, id)
  v = v.pop()

  return v

}