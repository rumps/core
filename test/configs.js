import configs from '../src/configs'
import rump from '../src'

describe('rump.configs', () => {
  it('', () => {
    rump.configs
      .should.be.an.Object()
      .which.has.keys('main', 'watch')
  })

  it('.watch', () => {
    rump.configs.watch
      .should.be.a.Boolean()
      .which.is.false()
  })

  describe('.main', () => {
    it('', () => {
      rump.configs.main
        .should.be.an.Object()
        .which.is.exactly(configs.main)
        .and.has.keys('clean', 'environment', 'globs', 'paths')
    })

    it('.clean', () => {
      rump.configs.main.clean
        .should.be.a.Boolean()
        .which.is.true()
    })

    it('.environment', () => {
      rump.configs.main.environment.should.be.a.String()
    })

    describe('.globs', () => {
      it('', () => {
        rump.configs.main.globs
          .should.be.an.Object()
          .which.has.keys('global')
      })

      it('.global', () => {
        rump.configs.main.globs.global
          .should.be.an.Array()
          .which.is.empty()
      })

      describe('.paths', () => {
        it('', () => {
          rump.configs.main.paths
            .should.be.an.Object()
            .which.has.keys('source', 'destination')
        })

        describe('.destination', () => {
          it('', () => {
            rump.configs.main.paths.destination
              .should.be.an.Object()
              .which.has.keys('root')
          })

          it('.root', () => {
            rump.configs.main.paths.destination.root
              .should.be.a.String()
              .which.is.exactly('dist')
          })
        })

        describe('.source', () => {
          it('', () => {
            rump.configs.main.paths.source
              .should.be.an.Object()
              .which.has.keys('root')
          })

          it('.root', () => {
            rump.configs.main.paths.source.root
              .should.be.a.String()
              .which.is.exactly('src')
          })
        })
      })
    })
  })
})
