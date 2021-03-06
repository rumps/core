import should from 'should'
import thenify from 'thenify'
import trashWithCallback from 'trash'
import rump from '../src'
import {exists} from 'mz/fs'
import {resolve} from 'path'
import {spy} from 'sinon'

const trash = thenify(trashWithCallback)

describe('rump', () => {
  beforeEach(() => {
    delete rump.taskPrefix
    rump.configure()
  })

  it('.autoload', async() => {
    const module1 = resolve('node_modules/rump-a/index.js'),
          module2 = resolve('node_modules/rump-b/index.js'),
          module3 = resolve('node_modules/rumpc/index.js')
    should(require.cache[module1]).not.be.ok()
    should(require.cache[module2]).not.be.ok()
    should(require.cache[module3]).not.be.ok()
    if(await exists('node_modules/rump-b')) {
      await trash(['node_modules/rump-b'])
    }
    rump.autoload()
    should(require.cache[module1]).be.ok()
    should(require.cache[module2]).not.be.ok()
    should(require.cache[module3]).not.be.ok()
    require('rumpc')
    should(require.cache[module3]).be.ok()
  })

  it('.configure', () => {
    const callback = spy(),
          defaultConfig = {...rump.configs.main}
    rump.on('update:main', callback)
    rump.configure.should.be.a.Function()
    rump.configure({environment: 'production'})
    callback.should.be.calledOnce()
    rump.configs.main.should.not.eql(defaultConfig)
    rump.configure()
    callback.should.be.calledTwice()
    rump.configs.main.should.eql(defaultConfig)
  })

  it('.reconfigure', () => {
    const callback = spy(),
          defaultConfig1 = {...rump.configs.main}
    let defaultConfig2 = null
    rump.on('update:main', callback)
    rump.reconfigure.should.be.a.Function()
    rump.reconfigure({environment: 'production'})
    callback.should.be.calledOnce()
    rump.configs.main.should.not.eql(defaultConfig1)
    defaultConfig2 = {...rump.configs.main}
    rump.reconfigure()
    callback.should.be.calledTwice()
    rump.configs.main.should.not.eql(defaultConfig1)
    rump.configs.main.should.eql(defaultConfig2)
  })

  it('.taskName', () => {
    rump.taskName('hello').should.equal('hello')
    rump.taskName('hello:world').should.equal('hello:world')
    rump.taskName('hello', 'world').should.equal('hello:world')
    rump.taskName('hello', 'world:again').should.equal('hello:world:again')
    rump.taskPrefix = 'rump'
    rump.taskName('hello').should.equal('rump:hello')
    rump.taskName('hello:world').should.equal('rump:hello:world')
    rump.taskName('hello', 'world').should.equal('rump:hello:world')
    rump.taskName('hello', 'world:again').should.equal('rump:hello:world:again')
  })
})
