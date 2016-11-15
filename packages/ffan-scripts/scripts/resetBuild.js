import fse from 'fs-extra'
import paths from '../config/paths'
import GitRepo from 'git-repository'
import {execPromise} from './lib/processPromise'

//const origin = {
//  name: 'origin',
//  url: 'git@work.dianshang.wanda.cn:web-fe/ffan-activity.git',
//}

const remoteName = 'origin'
const remoteUrl = 'git@10.77.144.192:web-fe/activity-ffan-source.git'

const currentCwd = {cwd: paths.appRoot}
const buildCwd = {cwd: paths.appBuild}

export default async function resetBuild() {
  //fse.ensureDirSync(paths.appBuild)
  //const repo = await GitRepo.open(paths.appBuild, {init: true})
  //repo.setRemote(remoteName, remoteUrl)
  //const branch = await execPromise('git rev-parse --abbrev-ref HEAD', currentCwd)
  //await execPromise('git clean -f', buildCwd)
  //
  //const isRefExists = await GitRepo.hasRef(remoteUrl, branch)
  //if (isRefExists) {
  //  await execPromise(`git fetch origin ${branch}`, buildCwd)
  //  await execPromise(`git checkout -f ${branch}`, buildCwd)
  //  await execPromise(`git reset --hard origin/${branch}`, buildCwd)
  //} else {
  //  // TODO : 测试阶段暂时从 master 分支迁出
  //  await execPromise(`git fetch origin master`, buildCwd)
  //  await execPromise(`git reset --hard origin/master`, buildCwd)
  //  await execPromise(`git checkout -B ${branch}`, buildCwd)
  //}





  // 2. fetch current branch
  // 3. reset --hard current branch

}
