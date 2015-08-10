import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

task(name('lint'), [])
task(name('lint:watch'), [name('watch:setup')])
