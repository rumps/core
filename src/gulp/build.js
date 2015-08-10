import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

task(name('build'), [name('clean')])

task(name('build:prod'), [
  name('prod:setup'),
  name('build'),
])
