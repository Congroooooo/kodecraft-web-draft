import { navigationLinks } from '../content/siteContent'
import { KodeCraftLogo } from './KodeCraftLogo'

export function Header() {
  const currentPath = window.location.pathname
  const isHome = currentPath === '/'

  const getHref = (href: string) => (isHome || !href.startsWith('#') ? href : `/${href}`)
  const isActive = (href: string, children?: Array<{ href: string }>) =>
    currentPath === href || Boolean(children?.some((child) => child.href === currentPath))

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand-mark" href={isHome ? '#top' : '/#top'} aria-label="KodeCraft home">
        <KodeCraftLogo />
      </a>

      <nav className="nav-links" aria-label="Main menu">
        {navigationLinks.map((link) => {
          const children = 'children' in link ? link.children : undefined

          return children ? (
            <div className="nav-dropdown" key={link.href}>
              <button aria-current={isActive(link.href, children) ? 'page' : undefined} aria-haspopup="true" type="button">
                {link.label}
                <span className="nav-dropdown-caret" aria-hidden="true" />
              </button>

              <div className="nav-dropdown-menu" aria-label={`${link.label} menu`}>
                {children.map((child) => (
                  <a
                    aria-current={currentPath === child.href ? 'page' : undefined}
                    href={child.href}
                    key={child.href}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              aria-current={isActive(link.href) ? 'page' : undefined}
              href={getHref(link.href)}
              key={link.href}
            >
              {link.label}
            </a>
          )
        })}
      </nav>

      <a className="nav-cta" href={isHome ? '#contact' : '/#contact'}>
        Apply Now
      </a>
    </header>
  )
}
