import './polyfill'
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
    const pkg = require(resolve('package')),
          {dependencies = {}} = pkg,
          {devDependencies = {}} = pkg,
          {optionalDependencies = {}} = pkg,
          {peerDependencies = {}} = pkg,
          keys1 = Object.keys(dependencies),
          keys2 = Object.keys(devDependencies),
          keys3 = Object.keys(optionalDependencies),
          keys4 = Object.keys(peerDependencies),
          modules = [...keys1, ...keys2, ...keys3, ...keys4]
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
    this.configure(extend(true, this[lastOptionsKey], options))
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
