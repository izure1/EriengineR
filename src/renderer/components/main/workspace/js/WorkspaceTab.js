class WorkspaceTab {

  constructor(id, name, events = {}) {

    this.id = id
    this.name = name
    this.selected = false

    this.oncreate = events.oncreate
    this.onclick = events.onclick
    this.onclose = events.onclose

  }

}


export default WorkspaceTab