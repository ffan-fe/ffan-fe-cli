import paths from '../config/paths'
import fse from 'fs-extra'
import inquirer from 'inquirer'

var questions = [
  {
    type   : 'list',
    name   : 'framework',
    message: 'Which framework do you choose? [CTRL-C to Exit]',
    choices: ['jQuery.js', 'React.js', 'Vue.js'],
    filter : function (val) {
      return val.toLowerCase().split('.')[0]
    }
  }
]

var businessPrompt = [
  {
    type   : 'list',
    name   : 'business',
    message: 'Which type of business do you choose? [CTRL-C to Exit]',
    choices: ['default', 'WeChat', 'NativeShare']
  }
]

function getFramework() {
  return new Promise(resolve => {
    inquirer.prompt(questions).then(function (answers) {
      console.log(answers)
      if (answers.framework === 'jquery') {
        inquirer.prompt(businessPrompt).then(function (ans) {
          return resolve({...answers, ...ans})
        })
      } else {
        return resolve({...answers, ...{business: 'default'}})
      }
    })
  })
}

async function newPage(argv) {

  try {
    const pageName = argv['_'][1]
    if (!pageName) {
      return console.log('You must enter pageName like '.cyan, '[ npm run new 161001_main ]'.yellow)
    }

    const pageDir = paths.resolve(paths.appSrc, pageName)

    if (fse.existsSync(pageDir)) {
      return console.log(`-- ${pageDir} is exist! --`.cyan)
    }

    const {framework, business} = await getFramework()

    fse.ensureDirSync(pageDir)
    fse.copySync(paths.resolve(paths.appCommons, 'boilerplate', framework, business), pageDir)

    console.log("\n-------------".yellow)
    console.log('-- Done! Please start page as follow command:\n'.cyan)
    console.log(`npm run start ${pageName}`.blue)
    console.log("-------------\n".yellow)
  } catch (e) {
    console.log(`-- new page error --`)
    console.log(e)
  }

}

export default newPage
