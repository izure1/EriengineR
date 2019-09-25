import path from 'path'
import read from '../database/read'

import DATABASE_INIT_TABLE_QUERY from './Vars/DATABASE_INIT_TABLE_QUERY'


export default async function () {

  let db, dist

  dist = path.join(this.variables.project.directory, this.variables.project.locale.path)
  db = await read.call(this, dist)

  // Database initial
  db.run(DATABASE_INIT_TABLE_QUERY)

  this.variables.project.locale.database = db
  this.variables.project.locale.path = dist

  await db.save()
  return db

}