const globby = require('globby')
const pkg = require('../package.json')
//const defaultBuildDir = pkg.dirs.buildDir
import path from 'path'
import fs from 'fs'
import request from 'request'
import paths from '../config/paths'

const sendFile = (filePath, fileName, mime = 'text/plain') => {

  let formData = {
    project     : 'newactivity',
    authkey     : 'efc0b8e0291c382f00e1b299ebcfa286',
    'Upload[]'  : [fs.createReadStream(filePath)],
    'FileName[]': [fileName],
  }

  return new Promise((resolve, reject) => {
    request.post('http://opads.intra.ffan.com/openapi/nres-upload', {
      json    : true,
      formData: formData,
    }, function (err, httpResponse, body) {
      if (err) {
        console.log(err)
        return reject(err)
      }

      if (typeof body === 'object' && body.data[0]) {
        //console.log(JSON.stringify(body.data, null, 2))
        const cdnUrl = body.data[0]["10.213.19.144"]['url']
        console.log(`    ${filePath} \n => ${cdnUrl}`)
        return resolve(body.data)
      } else {
        console.log(body)
        return reject(body)
      }
    }).on('error', function (err) {
      console.log(err)
      return reject(err)
    })

  })
}

async function uploadCDN(sourceDir) {
  sourceDir = sourceDir || process.argv[3]
  const types = [
    {
      path: "assets/img/"
    }, {
      path: "assets/js/"
    }, {
      path: "assets/css/"
    }
  ]

  for (let type of types) {
    await sendByType(sourceDir, type.path)
  }
}

async function sendByType(sourceDir, typePath) {
  const imageDir = path.resolve(paths.appBuild, typePath, sourceDir)
  console.log(await typePath)
  try {
    const sourceDirs = await globby([sourceDir + '**'], {
      cwd: imageDir,
    })

    if (sourceDirs.length) {
      for (let fileName of sourceDirs) {
        const data = await sendFile(path.resolve(imageDir, fileName), typePath + fileName)
        // TODO: 这个接口太慢了，所以我当批量接口发了
        //const data = sendFile(path.resolve(imageDir, fileName), typePath + fileName)
      }

      //const sendFiles = sourceDirs.map(fileName=> {
      //  return sendFile(path.resolve(imageDir, fileName), typePath + fileName)
      //})
      //console.log(sendFiles)
      //await Promise.all(sendFiles)

    }
  } catch (e) {
    console.log(e)
  }
}

export default uploadCDN
