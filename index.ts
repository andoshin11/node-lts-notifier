import { setOutput, setFailed } from '@actions/core'
import fetch from 'node-fetch'

async function main() {
  try {
    console.log('Start script...')
    const res = await fetch('https://nodejs.org/ja/feed/releases.xml')
    const json = await res.json()
    const text = await res.text()
    console.log(json)
    console.log(text)
    setOutput('version', 'test-version')
  } catch (e) {
    setFailed(e.message)
  }
}

main()
