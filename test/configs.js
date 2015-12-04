import 'babel/register-without-polyfill'
import 'should'
import test from 'ava'
import configs from '../src/configs'
import rump from '../src'

test('rump.configs', () => {
  rump.configs
    .should.be.an.Object()
    .which.has.keys('main', 'watch')
})

test('rump.configs.watch', () => {
  rump.configs.watch
    .should.be.a.Boolean()
    .which.is.false()
})

test('rump.configs.main', () => {
  rump.configs.main
    .should.be.an.Object()
    .which.is.exactly(configs.main)
    .and.has.keys('clean', 'environment', 'globs', 'paths')
})

test('rump.configs.main.clean', () => {
  rump.configs.main.clean
    .should.be.a.Boolean()
    .which.is.true()
})

test('rump.configs.main.environment', () => {
  rump.configs.main.environment
    .should.be.a.String()
})

test('rump.configs.main.globs', () => {
  rump.configs.main.globs
    .should.be.an.Object()
    .which.has.keys('global')
})

test('rump.configs.main.globs.global', () => {
  rump.configs.main.globs.global
    .should.be.an.Array()
    .which.is.empty()
})

test('rump.configs.main.paths', () => {
  rump.configs.main.paths
    .should.be.an.Object()
    .which.has.keys('source', 'destination')
})

test('rump.configs.main.paths.destination', () => {
  rump.configs.main.paths.destination
    .should.be.an.Object()
    .which.has.keys('root')
})

test('rump.configs.main.paths.destination.root', () => {
  rump.configs.main.paths.destination.root
    .should.be.a.String()
    .which.is.exactly('dist')
})

test('rump.configs.main.paths.source', () => {
  rump.configs.main.paths.source
    .should.be.an.Object()
    .which.has.keys('root')
})

test('rump.configs.main.paths.source.root', () => {
  rump.configs.main.paths.source.root
    .should.be.a.String()
    .which.is.exactly('src')
})
