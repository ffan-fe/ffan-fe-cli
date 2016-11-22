import fse from 'fs-extra'
import paths from '../config/paths'
import GitRepo from 'git-repository'
import { execPromise } from './lib/processPromise'
import { resolve } from 'path'
import { getPack } from './lib/package'

const remoteName = 'origin'

async function getCurrentBranch(cwd) {
  let branch = await execPromise('git symbolic-ref HEAD 2> /dev/null', cwd)
  return branch.trim().split('/').slice(-1)[0]
}

const currentCwd = {cwd: paths.appRoot}
const buildCwd = {cwd: paths.appBuild}

async function resetBuild() {


  const remotes = getPack('remotes')

  let remoteOrigin = {}
  if (remotes && remotes.length) {
    remoteOrigin = remotes.find(v => v.name === remoteName)
  }

  if (!remoteOrigin.name) {
    throw new Error('remoteOrigin is not found')
  }

  fse.ensureDirSync(paths.appBuild)
  const repo = await GitRepo.open(paths.appBuild, {init: true})
  repo.setRemote(remoteOrigin.name, remoteOrigin.url)
  let branch = await getCurrentBranch(currentCwd)
  repo._branch = branch
  repo._name = remoteName
  await execPromise('git clean -f', buildCwd)

  const isRefExists = await repo.hasRef(remoteOrigin.url, branch)
  if (isRefExists) {
    await execPromise(`git fetch -f origin ${branch}`, buildCwd)
    await execPromise(`git checkout -f ${branch}`, buildCwd)
    await execPromise(`git reset --hard origin/${branch}`, buildCwd)
  } else {
    // TODO : 测试阶段暂时从 master 分支迁出
    // 一定要保证远端build master 分支有代码，否则报错
    await execPromise(`git fetch -f origin master`, buildCwd)
    await execPromise(`git reset --hard origin/master`, buildCwd)
    await execPromise(`git checkout -B ${branch}`, buildCwd)
  }
  return await repo;

}

export default resetBuild;
