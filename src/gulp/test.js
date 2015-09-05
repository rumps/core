import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName
const task = ::gulp.task

task(name('test'), [])
task(name('test:watch'), [name('watch:setup')])
