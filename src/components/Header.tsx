import { navigationLinks } from '../content/siteContent'
import { KodeCraftLogo } from './KodeCraftLogo'

export function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand-mark" href="#top" aria-label="KodeCraft home">
        <KodeCraftLogo />
      </a>

      <nav className="nav-links" aria-label="Main menu">
        {navigationLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#contact">
        Apply Now
      </a>
    </header>
  )
}
