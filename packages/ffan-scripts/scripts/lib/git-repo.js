import { exec, spawn } from  'child_process';
import colors from "colors"

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

export const getCurrentBranch = ({cwd = "./"}) => execPromise(
  "git rev-parse --abbrev-ref HEAD",
  {cwd, encoding: 'utf8'}
);

export const checkoutBranch = (branch, {cwd = './build'}) => execPromise(
  `git checkout -f ${branch}`,
  {cwd, encoding: 'utf8'}
);

export const fetchBranch = (branch, {cwd = './build'}) => execPromise(
  `git fetch sit ${branch}:${branch}`,
  {cwd, encoding: 'utf8'}
);

export const deleteBranch = (branch, {cwd = './build'}) => execPromise(
  `git branch -D  ${branch}`,
  {cwd, encoding: 'utf8'}
);

export const pullBranch = (branch, {cwd = './build'}) => execPromise(
  `git pull sit ${branch}`,
  {cwd, encoding: 'utf8'}
);

export const checkoutNewBranch = (branch, {cwd = './build'}) => execPromise(
  `git checkout -b  ${branch}`,
  {cwd, encoding: 'utf8'}
);

export const cleanBranch = ({cwd = './build'}) => execPromise(
  `git reset --hard HEAD`,
  {cwd, encoding: 'utf8'}
);

export const gitCommand = (command, cwd = './') => execPromise(
  `git ${command}`, {cwd, encoding: 'utf8'}
);

export const showGitMessage = (params, options) => {

  const display = Array.isArray(params) ? params.concat(' ') : params;
  console.log(`git ${display}`.blue)
  spawnPromise(
    'git', params, {...options, stdio: "inherit"}
  )
};


