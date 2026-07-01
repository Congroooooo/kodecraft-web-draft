import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const sel = 'a[href="#roles"]'
const el = await page.$(sel)
const data = await el.evaluate((node) => {
  const cs = getComputedStyle(node)
  const utilSel = '.text-\\[\\#07100b\\]'
  const matches = node.matches(utilSel)
  // walk parent chain to find the closest ancestor that sets color
  const chain = []
  let n = node
  while (n && n !== document.body) {
    const c = getComputedStyle(n).color
    const cls = n.className || n.tagName
    chain.push({ tag: n.tagName, cls: String(cls).slice(0, 80), color: c })
    n = n.parentElement
  }
  return {
    color: cs.color,
    matchesUtil: matches,
    utilSelector: utilSel,
    chain,
  }
})
console.log(JSON.stringify(data, null, 2))

await browser.close()