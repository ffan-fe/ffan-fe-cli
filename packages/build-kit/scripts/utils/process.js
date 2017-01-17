import { exec, spawn } from  'child_process';

export const execPromise = (command, options) => new Promise((resolve, reject) => {
  let out = '';
  let err = '';
  const p = exec(command, options);
  p.stdout.on('data', data => out += data);
  p.stderr.on('data', data => err += data);
  p.on('error', reject);
  p.on('close', (code) => {
    if (code !== 0) {
      console.log(err);
      return reject(err)
    } else {
      return resolve(out)
    }
  });
});


export const spawnPromise = (command, params, options) => new Promise((resolve, reject) => {

  if (typeof params === 'string') {
    params = params.trim().split(" ")
  }

  let out = '';
  let err = '';
  const p = spawn(command, params, options);
  if (p.stdout) {
    p.stdout.on('data', data => out += data);
    p.stderr.on('data', data => err += data);
    p.on('error', reject);
    p.on('close', (code) => resolve(out.trim()));
  } else {
    if (code !== 0) {
      return reject(err)
    } else {
      return resolve(out)
    }
  }
});
