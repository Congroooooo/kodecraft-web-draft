import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const sel = 'a[href="#roles"]'
const el = await page.$(sel)
const data = await el.evaluate((node) => {
  // Recursively collect all CSS rules that set `color` and match the node,
  // including inside @layer blocks.
  const matched = []
  function walk(rules) {
    for (const rule of rules) {
      if (rule.cssRules) {
        // @layer, @media, etc. — recurse
        walk(rule.cssRules)
      }
      if (rule.selectorText) {
        try {
          if (node.matches(rule.selectorText)) {
            const text = rule.cssText
            if (text.includes('color')) matched.push({ sel: rule.selectorText, text: text.slice(0, 160) })
          }
        } catch (e) {}
      }
    }
  }
  for (const sheet of document.styleSheets) {
    try { walk(sheet.cssRules) } catch (e) {}
  }
  return { matched }
})
console.log(JSON.stringify(data, null, 2))

await browser.close()