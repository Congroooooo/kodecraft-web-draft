import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const data = await page.evaluate(() => {
  const found = []
  let sheetCount = 0
  let ruleCount = 0
  for (const sheet of document.styleSheets) {
    sheetCount++
    try {
      for (const rule of sheet.cssRules) {
        ruleCount++
        if (rule.cssText && rule.cssText.includes('07100b')) {
          found.push(rule.cssText.slice(0, 200))
        }
      }
    } catch (e) { /* CORS */ }
  }
  return { sheetCount, ruleCount, foundWith07100b: found }
})
console.log(JSON.stringify(data, null, 2))

await browser.close()