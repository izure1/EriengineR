import path from 'path'
import fs from 'fs-extra'
import createUUID from '@common/js/createUUID'
import createItem from '@common/js/createItem'


function regenerateVariableUUID(props) {

  let v

  if (!props) return
  for (let p in props) {

    v = props[p]
    v.id = createUUID()
    
    if (v.type === 'text') {
      v.value = '입력하세요'
    }

  }

}

function regenerateScriptUUID(tabs){

  for (let tab of tabs) {

    tab.id = createUUID()
    regenerateVariableUUID(tab.variables) // 변수의 id값 수정

  }

}

export default function (filepath) {

  let dir
  let files, file
  let context

  dir = path.dirname(filepath)
  files = fs.readdirSync(dir).map(t => path.parse(t).name)

  file = createItem(files, path.parse(filepath).name)
  file = path.join(dir, file)
  file += `.${path.parse(filepath).ext}`

  context = fs.readJSONSync(filepath)
  context.id = createUUID()

  // 각 사건, 조건, 행동 탭의 매크로의 id값 다시 받아오기
  regenerateScriptUUID(context.events)
  regenerateScriptUUID(context.conditions)
  regenerateScriptUUID(context.actions)

  context.position.x += 30
  context.position.y += 30

  fs.writeJSONSync(file, context, {
    spaces: 2
  })

}