import gulp from 'gulp'
import rump from '..'
import {green, magenta} from 'chalk'
import {version} from '../../package'

const name = ::rump.taskName,
      task = ::gulp.task,
      {environment} = rump.configs.main

task(name('info:core'), () => {
  console.log()
  console.log(magenta(`--- Core v${version}`))
  console.log(`Environment is ${green(environment)}`)
  console.log()
})

task(name('info'), [name('info:core')])
task(name('info:prod'), [name('prod:setup'), name('info')])
