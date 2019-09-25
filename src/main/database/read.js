import fs from 'fs-extra'
import initSQL from 'sql.js'

import write from './write'


/**
 * 
 * @param {SQL.Database} db 
 * @param {String} dist 
 */
function enableDBSave(db, dist) {

  db.save = async () => {
    return await write.call(this, dist, db)
  }
  
  return db

}


/**
 * 
 * @param {String} dist  Database file path
 */
export default async function (dist) {

  let SQL, db, filebuffer

  // 데이터베이스 파일이 없을 경우 새롭게 생성
  if (!fs.existsSync(dist)) {

    SQL = await initSQL()

    db = new SQL.Database

    filebuffer = db.export()
    filebuffer = Buffer.from(filebuffer)

    await fs.writeFile(dist, filebuffer)

  }

  // 위치에 있는 데이터베이스 파일로부터 읽어들이기
  filebuffer = await fs.readFile(dist)

  try {

    SQL = await initSQL()
    db = new SQL.Database(filebuffer)

  } catch (e) {

    throw `'${dist}'는(은) 올바른 데이터베이스 서식이 아닙니다.`

  }

  // DB 저장 메서드 추가
  return enableDBSave(db, dist)

}