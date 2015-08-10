import extend from 'extend'

const configs = {
  main: null,
  watch: false,
}

rebuild()

export default configs

export function rebuild(overrides) {
  const environment = process.env.NODE_ENV || 'development'
  configs.main = extend(true, {
    environment: environment.trim().toLowerCase(),
    globs: {global: []},
    paths: {
      source: {root: 'src'},
      destination: {root: 'dist'},
    },
  }, overrides)
}
