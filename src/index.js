import configs, {rebuild} from './configs'
import extend from 'extend'
import {EventEmitter} from 'events'
import {resolve} from 'path'

const lastOptionsKey = Symbol('lastOptions')

class Rump extends EventEmitter {
  configs = {
    get main() { return configs.main },
    get watch() { return configs.watch },
  }
  taskPrefix = ''

  constructor() {
    super()
    this[lastOptionsKey] = {}
  }

  addGulpTasks(options = {}) {
    this.taskPrefix = options.prefix
    require('./gulp')
    this.emit('gulp:main', options)
    return this
  }

  autoload() {
    const pkg = require(resolve('package'))
    const {
      dependencies = {},
      devDependencies = {},
      optionalDependencies = {},
      peerDependencies = {},
    } = pkg
    const modules = [
      ...Object.keys(dependencies),
      ...Object.keys(devDependencies),
      ...Object.keys(optionalDependencies),
      ...Object.keys(peerDependencies),
    ]
    modules.filter(isRumpModule).forEach(require)
    return this
  }

  configure(options) {
    this[lastOptionsKey] = extend(true, {}, options)
    rebuild(options)
    this.emit('update:main')
    return this
  }

  reconfigure(options) {
    return this.configure(extend(true, this[lastOptionsKey], options))
  }

  taskName(...args) {
    return [this.taskPrefix]
      .concat(args)
      .filter(x => typeof x === 'string')
      .join(':')
      .split(':')
      .filter(x => x)
      .join(':')
  }
}

export default new Rump()

function isRumpModule(mod) {
  if(/^rump-/.test(mod)) {
    try {
      require.resolve(mod)
      return true
    }
    catch(e) {
      return false
    }
  }
  return false
}
