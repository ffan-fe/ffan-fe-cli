import run from './run';
//import clean from './clean';
//import copy from './copy';
import server from './server';
import { getPageConfig } from './lib/validEntry';


export default async function start(_sourceDir) {
  try {
    const sourceDir = _sourceDir || process.argv[3];

    if (!sourceDir) {
      console.error('-- source dir is empty! --');
      return
    }

    const config = await getPageConfig(sourceDir);

    // await run(clean.bind(undefined, sourceDir));
    // await run(copy.bind(undefined, 'tmp'));
    // const serverConfig = await run(watch, config);
    await run(server, config);

    // https://github.com/facebookincubator/create-react-app/issues/263
    // https://github.com/facebookincubator/create-react-app/pull/744
    // https://github.com/facebookincubator/create-react-app/pull/744/files
  } catch (e) {
    console.log(e);
  }
}

