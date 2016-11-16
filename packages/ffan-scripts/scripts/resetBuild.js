import fse from 'fs-extra'
import paths from '../config/paths'
import GitRepo from 'git-repository'
import { execPromise } from './lib/processPromise'
import { resolve } from 'path'


async function getCurrentBranch(cwd) {
  let branch = await execPromise('git symbolic-ref HEAD 2> /dev/null', cwd)
  return branch.trim().split('/').slice(-1)[0]
}


const currentCwd = {cwd: paths.appRoot}
const buildCwd = {cwd: paths.appBuild}

export default async function resetBuild() {

  let originRemote = {}
  try {
    originRemote = fse.readJsonSync(resolve(paths.appRoot, 'package.json'))['remotes']
      .filter(value => value.name === 'origin')[0]
  } catch (e) {
    throw new Error('-- Can not find remotes["origin"] in  package.json')
  }

  if (!originRemote.name) {
    throw new Error('-- Can not find remotes["origin"] in  package.json')
  }

  fse.ensureDirSync(paths.appBuild)
  const repo = await GitRepo.open(paths.appBuild, {init: true})
  repo.setRemote(originRemote.name, originRemote.url)
  let branch = await getCurrentBranch(currentCwd)
  await execPromise('git clean -f', buildCwd)
  const isRefExists = await repo.hasRef(originRemote.url, branch)
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
}
