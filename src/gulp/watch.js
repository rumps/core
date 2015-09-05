import gulp from 'gulp'
import configs from '../configs'
import rump from '..'

const name = ::rump.taskName
const task = ::gulp.task

task(name('watch'), [name('clean:safe'), name('watch:setup')])
task(name('watch:prod'), [name('prod:setup'), name('watch')])
task(name('watch:setup'), () => configs.watch = true)
