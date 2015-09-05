import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName
const task = ::gulp.task

task(name('lint'), [])
task(name('lint:watch'), [name('watch:setup')])
