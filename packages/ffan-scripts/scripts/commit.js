

async function commit({repo, pages}) {
  await repo.add('--all .')
  await repo.commit(JSON.stringify(pages.toString()))
  await repo.push(repo._name, repo._branch)
}

export default commit
