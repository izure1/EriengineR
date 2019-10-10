import scriptDirectory from './scriptDirectory'
import scriptList from './scriptList'



function getPrev(contexts, context) {
  return contexts.filter(t => t.nexts.indexOf(context.id) !== -1)
}

function hasPrev(contexts, context) {
  return getPrev(contexts, context).length
}

export default async function (cwd = null, deep = true) {

  let scripts
  let eventless
  let prevless

  if (!cwd) {
    cwd = await scriptDirectory.call(this)
  }

  scripts = await scriptList.call(this, cwd, deep)

  eventless = scripts.filter(t => !t.events.length) // 위 prevless 중에서 이벤트가 존재하지 않는 스크립트를 배열로 받아옵니다
  eventless = eventless.filter(t => {

    let prevs = getPrev(scripts, t)
    let prevHasEvent = false

    for (let prev of prevs) {

      if (prev.events.length) {
        prevHasEvent = true
        break
      }

    }

    return !prevHasEvent

  })

  return eventless

}