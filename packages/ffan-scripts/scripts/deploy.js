import selectPage from './selectPage'
import { execPromise,spawnPromise} from './lib/processPromise';

async function deploy() {

  try {
    console.log(`$ git status -s`.blue)
    const status = await spawnPromise('git status -s')
    console.log(status ? status.red : '---------------'.blue)
    //var {page, isCDN} = await selectPage()
    //if (!page.length) {
    //  return console.log('You didn\'t choose any page!')
    //}
    //console.log(page)

  } catch (e) {
    console.log('33333333333')
    console.log(e)
  }
  //run(commit.bind(null, page, isCDN))
}

export default deploy
