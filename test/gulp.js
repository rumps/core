import gulp from 'gulp'
import timeout from 'timeout-then'
import configs from '../src/configs'
import rump from '../src'
import {exists, mkdir} from 'mz/fs'
import {spy} from 'sinon'
import {stripColor} from 'chalk'

describe('tasks', () => {
  beforeEach(() => {
    rump.configure({paths: {destination: {root: 'tmp'}}})
    rump.removeAllListeners('gulp:main')
    configs.watch = false
  })

  it('are added and defined', () => {
    const callback = spy()
    rump.on('gulp:main', callback)
    rump.addGulpTasks({prefix: 'spec'})
    callback.should.be.calledOnce()
    gulp.tasks['spec:build'].should.be.ok()
    gulp.tasks['spec:build:prod'].should.be.ok()
    gulp.tasks['spec:clean'].should.be.ok()
    gulp.tasks['spec:prod:setup'].should.be.ok()
    gulp.tasks['spec:info'].should.be.ok()
    gulp.tasks['spec:info:core'].should.be.ok()
    gulp.tasks['spec:info:prod'].should.be.ok()
    gulp.tasks['spec:lint'].should.be.ok()
    gulp.tasks['spec:lint:watch'].should.be.ok()
    gulp.tasks['spec:test'].should.be.ok()
    gulp.tasks['spec:test:watch'].should.be.ok()
    gulp.tasks['spec:watch'].should.be.ok()
    gulp.tasks['spec:watch:setup'].should.be.ok()
    gulp.tasks['spec:watch:prod'].should.be.ok()
  })

  it('displays correct information in info task', () => {
    const logs = [],
          {log} = console
    console.log = (...args) => logs.push(stripColor(args.join(' ')))
    gulp.start('spec:info')
    console.log = log
    logs.should.eql([
      '',
      '--- Core v0.7.0',
      'Environment is development',
      '',
    ])
  })

  it('handles watch', () => {
    configs.watch.should.be.false()
    rump.configs.watch.should.be.false()
    gulp.start('spec:watch:setup')
    configs.watch.should.be.true()
    rump.configs.watch.should.be.true()
  })

  it('cleans build directory', async() => {
    let tmpExists
    if(!await exists('tmp')) {
      await mkdir('tmp')
    }
    tmpExists = await exists('tmp')
    tmpExists.should.be.true()
    gulp.start('spec:clean')
    await timeout(1000)
    tmpExists = await exists('tmp')
    tmpExists.should.be.false()
  })

  it('handles production', () => {
    rump.configs.main.environment.should.equal('development')
    gulp.start('spec:prod:setup')
    rump.configs.main.environment.should.equal('production')
  })
})
