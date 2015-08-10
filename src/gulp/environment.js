import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

task(name('prod:setup'), () => {
  rump.reconfigure({environment: 'production'})
})
