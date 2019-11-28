import { setOutput, setFailed } from '@actions/core'
import fetch from 'node-fetch'

async function main() {
  try {
    console.log('Start script...')
    const res = await fetch('https://nodejs.org/ja/feed/releases.xml')
    const text = await res.text()
    console.log(text)
    setOutput('version', 'test-version')
  } catch (e) {
    setFailed(e.message)
  }
}

main()
