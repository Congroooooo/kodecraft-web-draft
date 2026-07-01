import { chromium } from '@playwright/test'

const targets = [
  { name: 'Apply Now (header)', sel: 'header a[href$="#contact"]' },
  { name: 'See Open Roles (hero)', sel: 'a[href="#roles"]' },
  { name: 'Homepage nav link', sel: 'header nav a[href="/"]' },
  { name: 'Moments dropdown trigger', sel: 'header nav .group a' },
]

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

for (const t of targets) {
  const el = await page.$(t.sel)
  if (!el) { console.log(`${t.name}: NOT FOUND (${t.sel})`); continue }
  const data = await el.evaluate((node) => {
    const cs = getComputedStyle(node)
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      textContent: node.textContent.trim().slice(0, 40),
      classes: node.className,
    }
  })
  console.log(JSON.stringify({ name: t.name, ...data }, null, 2))
}

await browser.close()