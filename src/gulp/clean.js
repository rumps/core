import del from 'del'
import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

task(name('clean'), () => del.sync(rump.configs.main.paths.destination.root))
