import inquirer from 'inquirer';
import fse from 'fs-extra'
import paths from '../config/paths'

export function getPages() {
  return fse.readdirSync(paths.appSrc)
}

async function selectPage() {

  let pages = getPages();
  pages.reverse().push('---------------------')
  pages = pages.filter(function (v) {
    return v !== '_commons'
  })

  return new Promise(resolve=> {
    inquirer.prompt(
      [{
        type     : 'checkbox',
        name     : 'page',
        message  : 'What\'s pages will you deploy? [CTRL-C to Exit]',
        paginated: true,
        choices  : pages
      },
        {
          type   : 'list',
          name   : 'isCDN',
          message: 'Will you upload static files to CDN? [CTRL-C to Exit]',
          choices: ['no', 'yes']
        }]
    ).then(function (answer) {
      resolve(answer)
    })
  })
}


export default selectPage
