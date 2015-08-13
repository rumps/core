import gulp from 'gulp'
import thenify from 'thenify'
import delWithCallback from 'del'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task,
      del = thenify(delWithCallback)

task(name('clean'), async() => {
  await del([rump.configs.main.paths.destination.root])
})
