import gulp from 'gulp'
import thenify from 'thenify'
import trashWithCallback from 'trash'
import rump from '..'

const name = ::rump.taskName,
      task = ::gulp.task,
      trash = thenify(trashWithCallback)

task(name('clean'), () => trash([rump.configs.main.paths.destination.root]))
