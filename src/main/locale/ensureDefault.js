import getAll from './getAll'
import getDefault from './getDefault'
import setDefault from './setDefault'
import emit from './emit'
import add from './add'


export default async function () {

  let row

  row = await getDefault.call(this)

  // 이미 지정된 기본 언어가 있을 경우 해당 값을 반환합니다
  if (row) {
    emit.call(this)
    return row
  }

  // 지정된 기본 언어가 없을 경우, 가장 첫 번째 언어를 기본 언어로 지정합니다
  // 하지만 그 전에, 등록된 언어가 1개 이상 있는지 체크합니다

  let isExists, rows

  rows = await getAll.call(this)
  isExists = !!rows.length

  // 등록된 언어가 하나도 없을 경우, 언어를 하나 생성 후 기본 언어로 지정
  if (!isExists) {

    row = await add.call(this, '기본 언어')
    row = await setDefault.call(this, '기본 언어')

    emit.call(this)

    return row

  }

  row = rows[0]
  row = await setDefault.call(this, row.name)

  emit.call(this)
  return row

}