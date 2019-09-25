import fs from 'fs-extra'


/**
 * 
 * @param {String} dist  Database file path
 * @param {SQL.Database} db  SQL.database Object
 */
export default async function (dist, db) {

  let data, buffer

  data = db.export()
  buffer = Buffer.from(data)

  await fs.writeFile(dist, buffer)

  return true

}