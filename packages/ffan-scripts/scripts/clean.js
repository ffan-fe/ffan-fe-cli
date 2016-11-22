import del from 'del'

/**
 * Cleans up the output (build) directory.
 * @param rootPath string
 * @param sourceDirs array|string
 */
async function clean({
  rootPath = 'build',
  sourceDirs = [],
}) {

  const sourceDirsType = typeof sourceDirs

  if (sourceDirsType === 'string') {
    sourceDirs = [sourceDirs]
  }

  if (!Array.isArray(sourceDirs)) {
    throw new Error('-- The type of sourceDir must be array or string ')
  }

  await Promise.all(sourceDirs.map(async dir => {
    await del([
      `${rootPath}/assets/css/${dir}`,
      `${rootPath}/assets/js/${dir}`,
      `${rootPath}/assets/img/${dir}`,
      `${rootPath}/html/${dir}`,
    ])
  }))

}

export default clean
