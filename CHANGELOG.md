# Changelog

#### 0.8.1
- Add task to clean with respect to user config

### 0.8.0
- Make use of `babel-runtime`

#### 0.7.6
- Use `del` instead of `trash` until series is supported in Gulp

#### 0.7.5
- Minor improvements and fixes

#### 0.7.4
- Build code with source maps inline

#### 0.7.3
- Move `thenify` to dependencies

### 0.7.0
- Use Babel fully for ES2015+
- Replace JSHint with ESLint
- Add code coverage support
- Update packages
- Rewrite tests with ES2015+ and should.js

#### 0.6.2
- Fix watch config exposed

#### 0.6.1
- Emit event for adding Gulp tasks
- Check for `optionalDependencies` in autoload

### 0.6.0
- **BREAKING**: Use `addGulpTasks` instead of `taskPrefix`/`setTaskPrefix`
- Update `del` and `require-all`
- Add and set up for `lint:` tasks

### 0.5.0
- Drop Rump and Gulp dependencies in packages (user use minor version)

### 0.4.0
- Drop use of `peerDependencies` (use `npm dedupe`)

### 0.3.0
- Remove task prefix by default

#### 0.2.3
- Add option to change task name prefix
- Add `:prod` tasks for tasks with production

#### 0.2.2
- Add reconfigure option

#### 0.2.1
- Add version information to info task

### 0.2.0
- Initial alpha version
