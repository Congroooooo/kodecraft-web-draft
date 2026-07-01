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

export function Header() {
  const currentPath = window.location.pathname
  const isHome = currentPath === '/'

  const getHref = (href: string) => {
    if (href === '#contact') {
      return '#contact'
    }

    return isHome || !href.startsWith('#') ? href : `/${href}`
  }
  const isActive = (href: string, children?: Array<{ href: string }>) =>
    currentPath === href || Boolean(children?.some((child) => child.href === currentPath))

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 flex items-center justify-start gap-[clamp(1rem,2vw,2rem)] px-kc-gutter py-[1.7rem] text-kc-text before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(180deg,rgba(7,11,20,0.32),rgba(7,11,20,0))] before:content-[''] max-[1024px]:pt-[1.2rem] max-[680px]:justify-center"
      aria-label="Primary navigation"
    >
      <a className="inline-flex text-kc-text" href={isHome ? '#top' : '/#top'} aria-label="KodeCraft home">
        <KodeCraftLogo />
      </a>

      <nav className="ml-auto flex items-center gap-[clamp(1rem,2.4vw,2.5rem)] max-[1024px]:hidden" aria-label="Main menu">
        {navigationLinks.map((link) => {
          const children = 'children' in link ? link.children : undefined

          return children ? (
            <div className="group relative" key={link.href}>
              <a
                className={dropdownTriggerClasses}
                aria-current={isActive(link.href, children) ? 'page' : undefined}
                aria-haspopup="true"
                href={children[0]?.href ?? link.href}
              >
                {link.label}
                <span
                  className="inline-block border-x-[0.22rem] border-t-[0.28rem] border-x-transparent border-t-current"
                  aria-hidden="true"
                />
              </a>

              <div
                className="pointer-events-none absolute left-0 top-full grid min-w-[11.5rem] gap-[0.15rem] pt-[0.6rem] opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                aria-label={`${link.label} menu`}
              >
                {children.map((child) => (
                  <a
                    className={dropdownMenuLinkClasses}
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
        className="relative inline-flex items-center overflow-hidden border border-[rgba(74,222,128,0.45)] bg-kc-brand px-[1.15rem] py-[0.9rem] font-kc-heading text-[0.76rem] font-bold uppercase tracking-[0.1em] text-[#07100b] [text-shadow:0_1px_1.25rem_rgba(7,11,20,0.72)] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[120%] before:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] before:content-[''] before:transition-transform before:duration-700 before:ease-kc-out hover:before:translate-x-[120%] focus-visible:before:translate-x-[120%] max-[680px]:hidden"
        href="#contact"
      >
        Apply Now
      </a>
    </header>
  )
}
