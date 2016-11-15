import childProcess from  'child_process'

/**
 * Use {stdio: 'pipe'} to exec a command.
 * @param command
 * @param options
 */
export const execPromise = (command, options) => new Promise((resolve, reject) => {
  let out = ''
  let err = ''
  const p = childProcess.exec(command, {encoding: 'utf-8', ...options})
  p.stdout.on('data', data => out += data)
  p.stderr.on('data', data => err += data)
  p.on('error', reject)
  p.on('close', code => {
    if (code !== 0) {
      console.log(err)
      return reject(err)
    } else {
      return resolve(out)
    }
  })
})

/**
 * Use {stdio: 'inherit'} to spawn a command.
 * @param commands
 * @param options
 */
export const spawnPromise = (commands, options) => new Promise((resolve, reject) => {

  commands = commands.trim().split(' ')
  const params = commands.slice(1)
  const command = commands[0]

  childProcess.spawn(command, params, {encoding: 'utf-8', stdio: 'inherit', ...options})
    .on('error', reject)
    .on('close', code => {
      if (code !== 0) {
        return reject(code)
      } else {
        return resolve(code)
      }
    })
})
