import gulp from 'gulp'
import configs from '../configs'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

task(name('watch'), [
  name('clean'),
  name('watch:setup'),
])

task(name('watch:setup'), () => {
  configs.watch = true
})

task(name('watch:prod'), [
  name('prod:setup'),
  name('watch'),
])
