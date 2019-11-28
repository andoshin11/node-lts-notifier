import { setOutput, setFailed } from '@actions/core'
import fetch from 'node-fetch'
import { parse } from 'fast-xml-parser'

interface ReleaseInfo {
  rss: {
    channel: {
      item: {
        title: string
      }[]
    }
  }
}

async function main() {
  try {
    console.log('Start script...')
    const res = await fetch('https://nodejs.org/ja/feed/releases.xml')
    const text = await res.text()

    const parsed: ReleaseInfo = parse(text, {
      ignoreAttributes: false
    })

    const { item } = parsed.rss.channel
    const versions = item.map(i => i.title)
    const ltsVersions = versions
      .map(v => v.match(/^Node v(\d+\.+\d+\.+\d) \(LTS\)/))
      .filter(Boolean)
      .map(i => i![1])

    console.log(versions)
    console.log(ltsVersions)
    setOutput('version', ltsVersions.join(', '))
  } catch (e) {
    setFailed(e.message)
  }
}

main()
