import gulp from 'gulp'
import rump from '..'
import {green, magenta, yellow} from 'chalk'
import {version} from '../../package'

const name = ::rump.taskName
const task = ::gulp.task
const {configs} = rump

task(name('info:core'), () => {
  const {clean, environment, paths} = configs.main
  console.log()
  console.log(magenta(`--- Core v${version}`))
  console.log(`Environment is ${green(environment)}`)
  if(clean) {
    console.log(`${yellow(paths.destination.root)} will be cleaned`)
  }
  console.log()
})

task(name('info'), [name('info:core')])
task(name('info:prod'), [name('prod:setup'), name('info')])
