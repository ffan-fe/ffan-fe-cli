import fs from 'fs-extra'
import path from 'path'

const packages = {
  "version" : "1.0.0",
  "keywords": [ "activity" ],
  "license" : "MIT",
}

const scripts = {
  "start" : "ffan-scripts start",
  "new"   : "ffan-scripts new",
  "update": "npm install ffan-scripts@latest --save-dev",
  "deploy": "ffan-scripts deploy",
}

const devDependencies = {
  "ffan-scripts"      : "0.0.6",
  "vue-hot-reload-api": "^1.3.3",
}

const dependencies = {
  "jquery"   : "^3.1.1",
  "react"    : "^15.4.0",
  "react-dom": "^15.4.0",
  "vue"      : "^1.0.28"
}

module.exports = function create({ name, namespace, cwd, ...rest }) {

  return new Promise((resolve, reject) => {
    if (!name || !namespace) {
      return reject(`name and namespace can not empty`)
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
        dependencies
      })

      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageFile, null, 2))

      resolve({ name, namespace, ...rest })

    } catch (e) {
      return reject(e)
    }

  })

}

