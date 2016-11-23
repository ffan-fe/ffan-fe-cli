const globby = require('globby')
import fse from 'fs-extra'
import paths from '../../config/paths'

//const defaultSourceDir = paths.appSrc
//const defaultSourceDir = paths.isInFfanScripts ? paths.join(paths.appSrc, 'default') : paths.appSrc


function getPageRoot(pageName, suffix = '') {
  return paths.resolve(paths.appSrc, pageName, paths.isInFfanScripts ? 'default' : '', suffix)
}

export async function getEntry(pageName) {
  const sourcePath = getPageRoot(pageName)

  if (!fse.lstatSync(sourcePath).isDirectory()) {
    return `'-- ${sourcePath} dir is empty! --`
  }

  let entriesFiles = await globby(['*.js', '*.jsx'], {
    cwd: sourcePath
  })

  if (!entriesFiles.length) {
    throw new Error(`-- cannot find any entries in ${sourcePath}--\n`)
  }

  entriesFiles = entriesFiles.map(function (entry) {
    return paths.resolve(sourcePath, entry)
  })

  return {[pageName]: entriesFiles}
}

export async function getPageConfig(pageName) {
  const defaultConfig = {
    name: pageName,
  }

  try {
    const configPath = getPageRoot(pageName, 'config.json')

    const config = fse.readJsonSync(configPath)
    config.html = config.html || {}
    if (!config.html.template) {
      const template = await getTemplate(pageName)
      if (template) {
        config.html.template = template
      }
    } else {
      config.html.template = getPageRoot(pageName, config.html.template)
    }

    return Object.assign(defaultConfig, config)

  } catch (e) {
    console.log('-- getPageConfig error --')
    console.log(e)
    return defaultConfig
  }
}

export async function getTemplate(pageName) {
  const templates = await globby(['index.html', 'index.hbs'], {
    cwd: getPageRoot(pageName),
  })

  if (templates.length !== 1) {
    if (templates.length > 1) {
      throw new Error('-- Template must only one! --\n'.cyan)
    }
    // not find custom template, use default template
    return ''
  } else {
    return getPageRoot(pageName, templates[0])
  }
}
