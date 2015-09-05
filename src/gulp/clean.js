import del from 'del'
import gulp from 'gulp'
import rump from '..'
import configs from '../configs'

const name = ::rump.taskName
const task = ::gulp.task

// Sync is used until there is a way to do series in Gulp
task(name('clean'), () => del.sync(configs.main.paths.destination.root))

// Sync is used until there is a way to do series in Gulp
task(name('clean:safe'), () => {
  if(configs.main.clean) {
    del.sync(configs.main.paths.destination.root)
  }
})
