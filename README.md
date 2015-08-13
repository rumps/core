# Rump
[![NPM](http://img.shields.io/npm/v/rump.svg?style=flat-square)](https://www.npmjs.org/package/rump)
![License](http://img.shields.io/npm/l/rump.svg?style=flat-square)
<br>
[![Dependencies](http://img.shields.io/david/rumps/core.svg?style=flat-square)](https://david-dm.org/rumps/core)
[![Dev Dependencies](http://img.shields.io/david/dev/rumps/core.svg?style=flat-square)](https://david-dm.org/rumps/core#info=devDependencies)
<br>
[![Travis](http://img.shields.io/travis/rumps/core.svg?style=flat-square&label=travis)](https://travis-ci.org/rumps/core)
[![Appveyor](http://img.shields.io/appveyor/ci/jupl/rump.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/jupl/rump)
[![Codecov](http://img.shields.io/codecov/c/github/rumps/core.svg?style=flat-square)](https://codecov.io/github/rumps/core?view=all)


## About
Rump and its related modules together make a semi-opinionated workflow for
assembling client-side assets, leveraging [Gulp](http://gulpjs.com/) tasks.
Sensible defaults are provided so no configuration is required. Don't like the
defaults? Want to change the folder structure? Configurations can be overriden
with ease. In some instances you can just rewrite options as you want with JS.
Gulp tasks are provided out of the box to easily assemble assets with one
task, or you can use the given tasks and integrate/create your own workflow
instead.


## Examples
If you are not interested in reading and just want to explore, check out the
[examples repository](https://github.com/rumps/examples) for some boilerplate
examples.


## Getting Started
You can easily start by creating a `gulpfile.js` file with the following:

```js
require('rump').autoload().addGulpTasks()
```

This will load all other Rump modules defined in `package.json` and add tasks
to Gulp. If you want to overwrite some configurations:

```js
require('rump').autoload().addGulpTasks().configure({
  ...
})
```

If you don't want to load all modules and prefer loading your own manually:

```js
// Load modules first before calling addGulpTasks
require('rump-scripts')
require('rump-styles')
require('rump').addGulpTasks()
```


## Notes
For Rump and modules `<1.0.0`, it is strongly recommended to use the same minor
version. (if using Rump `0.3.1`, the the modules can be `0.3.4`, `0.3.0`, etc.
but not `0.2.1` or `0.5.1`) In addition, make sure to make use of `npm dedupe`
to have Rump be in sync when modules make use of it.


## API

### `rump.autoload()`
Load all Rump modules (modules whose names start with `rump-`) that are defined
in `package.json`. If the module is not available (such as a module in
`devDependencies` that was not installed because of `npm install --production`)
then no error is raised and is skipped.

### `rump.addGulpTasks(options)`
Add all tasks from Rump modules to Gulp. If you load other Rump modules after
calling this, you need to call this again. Read the documentation for each Rump
module to see which tasks are defined. For information on source and
destination, see `rump.configure()` below.

#### `options.prefix`
Add prefix on Gulp task names. For example, if you set the prefix to `'rump'`,
then the task names will become `rump:build`, `rump:watch`, etc.

The following tasks are included:

- `build` will build all assets once from source to destination. Rump modules
will add to this task. (scripts, styles, etc.)
- `build:prod` is the same as `build` with `options.environment` set to
`'production'` for a production build.
- `watch` will build all assets once from source to destination, then monitor
for changes and update destination as needed. Rump modules will add to this
task. (scripts, styles, etc.)
- `watch:setup` is used to set up for tasks that build continuously, such as
`watch` and `test:watch`. This is typically used internally and has no effect
by itself.
- `watch:prod` is the same as `watch` with `options.environment` set to
`'production'` for a production build.
- `clean` will clean the contents of destination. This is invoked when running
the build or watch task. The destination should be considered volatile since
files on source may be removed.
- `info` will display information on this and other Rump modules in a readable
format. Rump modules will add to this task (scripts, styles, etc.)
- `info:prod` is the same as `info` with `options.environment` set to
`'production'` for a production build information.
- `info:core` will display information on the core module, including the
current environment set.
- `lint` will run code through linters once. Rump modules will add to this task. (scripts,
etc.)
- `lint:watch` will run code through linters continuously. Rump
modules will add to this task. (scripts, etc.)
- `test` will run all tests once. Rump modules will add to this task. (scripts,
etc.)
- `test:watch` will run tests continuously, useful for things like TDD. Rump
modules will add to this task. (scripts, etc.)

### `rump.configure(options)`
Redefine options for Rump and Rump modules to follow. Read the documentation
each Rump module to see what options are available.

### `rump.reconfigure(options)`
This is the same as `rump.configure()` above. The only difference is this
preserves configurations from a previous `configure` or `reconfigure` option
and overrides anything that is specified in `options`.

The following options for `configure`/`reconfigure` are available alongside
default values:

#### `options.environment` (`process.env.NODE_ENV` or `'development'`)
This is used by Rump modules to distinguish what kind of build to make.
Currently only two values are supported: (using another value is NOT
recommended)

- `development` typically does not optimize items and includes useful items
such as source maps and more. This is likely something you do not want to be
using in production.
- `production` focuses on minifications and optimizations for production level
builds.

#### `options.paths.source.root` (`'src'`)
This is the base directory where source code and items are housed for asset
builds. Rump modules will typically reference files/directories relative to
this path for builds. You can specify an absolute path, use the current
directory, (`''`) or other relative paths. (`'../../source'`)

#### `options.paths.destination.root` (`'dist'`)
This is the base directory where assets will be built to. Rump modules will
typically reference files/directories relative to this path for builds. You can
specify an absolute path or other relative paths. (`'../../build'`) **This
should be considered a volatile directory as it is subject to cleaning on
rebuilds, so make sure you understand which directory you declare.**

#### `options.globs.global` (`[]`)
These are globs that are to be applied to all Rump modules as an array of
strings. This is useful if you want to ignore certain files or directories. For
example, to ignore files in a directory named `prototype`:
`['!**/prototype/**/*']` Use this carefully as too many items will slow down
builds.

### `rump.configs`
This will contain references to configurations that are generated either by
default or from `rump.configure`. Read the documentation for each Rump module
to see additional items added to this object. The following options are
included.

#### `rump.configs.main`
This contains options with defaults or what has been changed through
`rump.configure()` or `rump.reconfigure()`. This is used by other Rump modules
and typically does not need to be modified. (except by Rump modules) If you
want to modify just use `rump.configure()` or `rump.reconfigure()` instead.
