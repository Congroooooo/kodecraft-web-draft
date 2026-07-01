import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const sel = 'a[href="#roles"]'
const el = await page.$(sel)
const data = await el.evaluate((node) => {
  const cs = getComputedStyle(node)
  const matched = []
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && node.matches(rule.selectorText)) {
          const text = rule.cssText
          if (text.includes('color')) matched.push(text.slice(0, 200))
        }
      }
    } catch (e) { /* CORS */ }
  }
  return {
    color: cs.color,
    classes: node.className,
    matchedColorRules: matched,
  }
})
console.log(JSON.stringify(data, null, 2))

await browser.close()