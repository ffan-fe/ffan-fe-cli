import fs from 'fs-extra'
import path from 'path'

const packages = {
  "version" : "1.0.0",
  "keywords": [ "activity" ],
  "license" : "MIT",
}

const scripts = {
  "start" : "build-kit start",
  "new"   : "build-kit new",
  "update": "npm install build-kit@latest --save-dev",
  "deploy": "build-kit deploy",
}

const devDependencies = {
  "build-kit"      : "1.0.10",
  "vue-hot-reload-api": "^1.3.3",
}

const dependencies = {
  "jquery"   : "^3.1.1",
  "react"    : "^15.4.0",
  "react-dom": "^15.4.0",
  "vue"      : "^1.0.28"
}

const proConfig = {
  "cdn-url": '', // cdn images's domain
  "upload-cdn-url": '' // uploading cdn url
}

const remotes = [
  {
    "name": "origin",
    "url": "git@xxxx.git"
  },
  {
    "name": "github",
    "url": "git@xxxx.git"
  }
]

module.exports = function create({ name, namespace = 'fe', cwd, ...rest }) {

  return new Promise((resolve, reject) => {
    if (!name) {
      return reject(`project name can not empty`)
    }

    try {
      const root = path.resolve(cwd || '', `${name}-source`);
      fs.ensureDir(root)
      const commonPath = path.resolve(__dirname, '../commons')
      fs.copySync(commonPath, path.resolve(root, 'commons'))

      const packageFile = { name }
      Object.assign(packageFile, {
        ...packages, ...rest,
        ...{ description: `${name}/${namespace}`, name, namespace }
      }, {
        scripts,
        devDependencies,
        dependencies,
        proConfig,
        remotes
      })

      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageFile, null, 2))

      resolve({ name, namespace, ...rest })

    } catch (e) {
      return reject(e)
    }

  })

}
