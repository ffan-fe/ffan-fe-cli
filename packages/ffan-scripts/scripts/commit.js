


async function commit({repo, pages}) {
  console.log(repo)
  repo.add('--all .')
  await repo.commit(JSON.stringify(pages.toString()))

}

export default commit
