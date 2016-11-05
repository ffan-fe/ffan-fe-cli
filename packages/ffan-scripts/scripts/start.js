import run from './run';
//import clean from './clean';
import watch from './watch';
//import copy from './copy';
import server from './server';
import {getConfig} from './lib/validEntry';


export default async function start(_sourceDir) {
  console.log('ssdfsdfsd dstart');
  await 1;


  try {
    const sourceDir = _sourceDir || process.argv[3];

    if (!sourceDir) {
      console.error('-- source dir is empty! --');
      return
    }



    // TODO:
    //const entries = await getEntry(sourceDir);
    const config = await getConfig(sourceDir);
    // 1. clean
    // 2. server
    //await run(clean.bind(undefined, sourceDir));
    //await run(copy.bind(undefined, 'tmp'));
    //console.log(process.cwd());

    const serverConfig = await run(watch, config);
    //await run(server.bind(undefined, sourceDir, serverConfig));
  } catch (e) {
    console.log(e);
  }
}

