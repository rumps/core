import del from 'del'
import gulp from 'gulp'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task

// Sync is used until there is a way to do series in Gulp
task(name('clean'), () => del.sync(rump.configs.main.paths.destination.root))
