export default function () {

  this.jsPlumb.reset()
  this.jsPlumb.ready(() => {

    let source
    let target
    let ids

    // 스트림을 끊으면 저장됩니다
    this.jsPlumb.bind('connectionDetached', info => {
      this.deleteConnection(info.source.dataset.id, info.target.dataset.id)
    })

    for (let script of this.scripts) {

      source = script.id
      target = script.nexts

      this.setConnectBox(source, target)
      this.setDraggableBox(script)

    }
    

  })

}