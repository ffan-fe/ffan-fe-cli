//import fs from 'fs';
//import path from 'path';
//const globby = require('globby');
//
//async function validModule({name : sourceDir, framework = 'jquery'}) {
//
//  //return new Promise((resolve, reject) => {
//
//
//    // TODO :
//    // 验证 sourceDir
//    // getEntry
//
//    const sourcePath = path.resolve(process.cwd(), 'src', sourceDir);
//
//    if (!fs.statSync(sourcePath).isDirectory()) {
//      return `'-- ${sourcePath} dir is empty! --`;
//    }
//
//    const entriesFiles = await globby(['*.js', '*.jsx'], {
//      cwd: sourcePath
//    })
//
//    const entry = {[sourceDir] : entriesFiles};
//
//  console.log(entry);
//
//
//
//
//    //if (!fs.readdirSync(sourcePath).length) {
//    //  return reject(`'-- ${sourcePath} dir is empty! --`);
//    //}
//
//
//
//    //let cmds = [];
//    //
//    //try {
//    //  cmds = fs.readdirSync(path.resolve(sourcePath)).filter(dirName => {
//    //      return fs.statSync(sourcePath).isDirectory() && dirName !== "node_modules";
//    //    }
//    //  )
//    //
//    //} catch (e) {
//    //  return reject(`-- ${path.resolve(sourcePath)} is not a directory! --`);
//    //}
//    //
//    //if (!cmds.length) {
//    //  return reject('-- source dir is not found --');
//    //}
//    //
//    //const fileNameTest = new RegExp("^(.*)?\.(js|jsx)$");
//    //let entry = {};
//    //// TODO: 文件夹以js结尾
//    //
//    //cmds.map(cmd => {
//    //  if (fileNameTest.test(cmd)) {
//    //    const matches = cmd.match(fileNameTest);
//    //    entry[matches[1]] = [
//    //      path.resolve(sourcePath, matches[0])
//    //    ];
//    //    if (framework === 'jquery') {
//    //      entry[matches[1]].push('babel-polyfill');
//    //    }
//    //  }
//    //});
//    //
//    //
//    //
//    //return resolve(entry);
//  //});
//
//}
//
//
//export default validModule;
//
