import { useEffect, useRef, useState } from 'react'
import { navigationLinks } from '../content/navigation'
import { KodeCraftLogo } from './KodeCraftLogo'

const topLevelNavItemClasses = [
  'relative font-kc-heading text-[0.76rem] font-bold uppercase tracking-[0.1em]',
  'text-[rgba(240,245,255,0.82)] [text-shadow:0_1px_1.25rem_rgba(7,11,20,0.72)]',
  'after:absolute after:inset-x-0 after:-bottom-[0.45rem] after:h-px after:origin-right after:scale-x-0',
  'after:bg-current after:transition-transform after:duration-[420ms] after:ease-kc-out after:content-[\'\']',
  'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
  'aria-[current=page]:text-kc-text aria-[current=page]:after:origin-left aria-[current=page]:after:scale-x-100',
].join(' ')

const dropdownMenuLinkClasses = [
  'relative block w-fit whitespace-nowrap py-[0.4rem]',
  topLevelNavItemClasses,
  'after:bottom-0',
].join(' ')

const dropdownTriggerClasses = [
  topLevelNavItemClasses,
  'inline-flex items-center gap-[0.42rem] border-0 bg-transparent p-0 text-left',
].join(' ')

const mobileNavLinkClasses = [
  'relative inline-flex w-fit font-kc-heading text-[1rem] font-bold uppercase tracking-[0.08em]',
  'text-[rgba(240,245,255,0.88)] transition-colors duration-300 ease-kc-out hover:text-kc-text focus-visible:text-kc-text',
  'after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[420ms] after:ease-kc-out after:content-[\'\']',
  'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
  'aria-[current=page]:text-kc-text aria-[current=page]:after:origin-left aria-[current=page]:after:scale-x-100',
].join(' ')

export function Header() {
  const currentPath = window.location.pathname
  const isHome = currentPath === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const getHref = (href: string) => {
    if (href === '#contact') {
      return '#contact'
    }

    return isHome || !href.startsWith('#') ? href : `/${href}`
  }
  const isActive = (href: string, children?: Array<{ href: string }>) =>
    currentPath === href || Boolean(children?.some((child) => child.href === currentPath))

  const closeDropdown = () => setOpenDropdown(null)

  useEffect(() => {
    setIsMobileMenuOpen(false)
    closeDropdown()
  }, [currentPath])

  useEffect(() => {
    if (!openDropdown) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openDropdown])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-20 flex items-center justify-start gap-[clamp(1rem,2vw,2rem)] px-kc-gutter py-[1.7rem] text-kc-text before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(180deg,rgba(7,11,20,0.32),rgba(7,11,20,0))] before:content-[''] max-[1024px]:pt-[1.2rem] max-[1024px]:justify-between max-[680px]:py-[1rem]"
        aria-label="Primary navigation"
      >
        <a className="inline-flex text-kc-text" href={isHome ? '#top' : '/#top'} aria-label="KodeCraft home">
          <KodeCraftLogo />
        </a>

        <nav className="ml-auto flex items-center gap-[clamp(1rem,2.4vw,2.5rem)] max-[1024px]:hidden" aria-label="Main menu">
          {navigationLinks.map((link) => {
            const children = 'children' in link ? link.children : undefined

            if (children) {
              const isDropdownOpen = openDropdown === link.href
              const menuId = `nav-menu-${link.href.replace(/[^a-z0-9]/gi, '')}`

              return (
                <div
                  className="relative"
                  key={link.href}
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={closeDropdown}
                  ref={dropdownRef}
                >
                  <button
                    className={dropdownTriggerClasses}
                    aria-current={isActive(link.href, children) ? 'page' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    aria-controls={menuId}
                    type="button"
                    onClick={() => setOpenDropdown((open) => (open === link.href ? null : link.href))}
                  >
                    {link.label}
                    <span
                      className="inline-block border-x-[0.22rem] border-t-[0.28rem] border-x-transparent border-t-current"
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full grid min-w-[11.5rem] gap-[0.15rem] pt-[0.6rem] transition-opacity duration-200 ${isDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                    aria-hidden={!isDropdownOpen}
                    aria-label={`${link.label} menu`}
                    id={menuId}
                    role="menu"
                  >
                    {children.map((child) => (
                      <a
                        className={dropdownMenuLinkClasses}
                        aria-current={currentPath === child.href ? 'page' : undefined}
                        href={child.href}
                        key={child.href}
                        onClick={closeDropdown}
                        role="menuitem"
                        tabIndex={isDropdownOpen ? undefined : -1}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <a
                className={topLevelNavItemClasses}
                aria-current={isActive(link.href) ? 'page' : undefined}
                href={getHref(link.href)}
                key={link.href}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <a
          className="relative inline-flex items-center overflow-hidden border border-[rgba(74,222,128,0.45)] bg-kc-brand px-[1.15rem] py-[0.9rem] font-kc-heading text-[0.76rem] font-bold uppercase tracking-[0.1em] text-[#07100b] [text-shadow:0_1px_1.25rem_rgba(7,11,20,0.72)] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[120%] before:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] before:content-[''] before:transition-transform before:duration-700 before:ease-kc-out hover:before:translate-x-[120%] focus-visible:before:translate-x-[120%] max-[1024px]:hidden"
          href="#contact"
        >
          Apply Now
        </a>

        <button
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="hidden h-11 w-11 items-center justify-center border-0 bg-transparent p-0 text-kc-text max-[1024px]:inline-flex"
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ease-kc-out ${isMobileMenuOpen ? 'translate-y-[0.46rem] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-300 ease-kc-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ease-kc-out ${isMobileMenuOpen ? '-translate-y-[0.46rem] -rotate-45' : ''}`} />
          </span>
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[19] hidden max-[1024px]:block ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        id="mobile-menu"
      >
        <div
          className={`h-full overflow-y-auto bg-[#05070d] bg-[radial-gradient(ellipse_at_72%_-4%,rgba(74,222,128,0.09),transparent_30rem)] shadow-[0_1.5rem_4rem_rgba(0,0,0,0.5)] transition-transform duration-[var(--reveal-duration)] will-change-transform ${isMobileMenuOpen ? 'translate-y-0 ease-[var(--reveal-ease-open)]' : '-translate-y-full ease-[var(--reveal-ease-close)]'}`}
        >
          <nav className="mx-auto grid min-h-svh w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)] grid-rows-[auto_1fr_auto] gap-7 pb-10 pt-[clamp(7rem,18vw,9rem)]" aria-label="Mobile menu">
            <div className="grid border-t border-[rgba(148,163,184,0.12)]">
              {navigationLinks.map((link) => {
                const children = 'children' in link ? link.children : undefined

                return children ? (
                  <div className="grid gap-3 border-b border-[rgba(148,163,184,0.12)] py-4" key={link.href}>
                    <a
                      className={mobileNavLinkClasses}
                      aria-current={isActive(link.href, children) ? 'page' : undefined}
                      href={children[0]?.href ?? link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                    <div className="grid gap-2 border-l border-[rgba(148,163,184,0.16)] pl-4">
                      {children.map((child) => (
                        <a
                          className="w-fit text-[0.95rem] font-semibold text-[rgba(203,213,225,0.8)] transition-colors duration-300 ease-kc-out hover:text-kc-text focus-visible:text-kc-text"
                          aria-current={currentPath === child.href ? 'page' : undefined}
                          href={child.href}
                          key={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    className={`${mobileNavLinkClasses} border-b border-[rgba(148,163,184,0.12)] py-4`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    href={getHref(link.href)}
                    key={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            <div aria-hidden="true" />

            <div className="grid gap-3">
              <a
                className="relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden border border-[rgba(74,222,128,0.45)] bg-kc-brand px-[1.15rem] py-[0.9rem] font-kc-heading text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[#07100b] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[120%] before:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] before:content-[''] before:transition-transform before:duration-700 before:ease-kc-out hover:before:translate-x-[120%] focus-visible:before:translate-x-[120%]"
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply Now
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
