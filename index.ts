import core from '@actions/core'
import fetch from 'node-fetch'

async function main() {
  try {
    console.log('Start script...')
    const res = await fetch('https://nodejs.org/ja/feed/releases.xml')
    const json = await res.json()
    console.log(json)
    core.setOutput('version', 'test-version')
  } catch (e) {
    core.setFailed(e.message)
  }
}

main()
