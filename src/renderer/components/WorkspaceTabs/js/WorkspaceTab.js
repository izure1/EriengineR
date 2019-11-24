class WorkspaceTab {

  constructor(name, events = {}) {

    this.name = name
    this.selected = false

    this.oncreate = events.oncreate
    this.onclick = events.onclick
    this.onclose = events.onclose

  }

}


export default WorkspaceTab