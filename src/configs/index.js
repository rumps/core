import extend from 'extend'

const configs = {
  main: null,
  watch: false,
}

rebuild()

export default configs

export function rebuild(overrides) {
  const {NODE_ENV = 'development'} = process.env
  configs.main = extend(true, {
    clean: true,
    environment: NODE_ENV.trim().toLowerCase(),
    globs: {global: []},
    paths: {
      source: {root: 'src'},
      destination: {root: 'dist'},
    },
  }, overrides)
}
