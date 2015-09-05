import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName
const task = ::gulp.task

task(name('prod:setup'), () => rump.reconfigure({environment: 'production'}))
