import fs from 'fs'
import path from 'path'

import createUUID from '@/js/createUUID'


class ScriptContext {

  constructor() {
    this.id = createUUID()
    this.macro = null
    this.arguments = {}
  }

  get text() {

  }

}

class Script {

  constructor() {
    this.id = createUUID()
    this.events = []
    this.conditions = []
    this.actions = []
    this.nexts = []
    this.comment = ''
  }

}


export default {
  Script,
  ScriptContext
}