import footerBackground from '../assets/imageTrail39.jpg?format=webp&quality=76'

const footerLinkClasses = [
  'relative w-fit text-[rgba(240,245,255,0.82)] transition-colors duration-300 ease-kc-out hover:text-kc-text focus-visible:text-kc-text',
  'after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[420ms] after:ease-kc-out after:content-[\'\']',
  'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
].join(' ')
const footerButtonClasses = 'bg-[rgba(240,245,255,0.14)] px-[1.35rem] py-4 text-kc-text transition-colors duration-300 ease-kc-out hover:bg-kc-brand hover:text-[#07100b] focus-visible:bg-kc-brand focus-visible:text-[#07100b]'
const footerSocialLinkClasses = [
  'relative inline-flex h-10 w-10 items-center justify-center text-kc-text',
  'after:absolute after:inset-x-0 after:-bottom-[0.2rem] after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[420ms] after:ease-kc-out after:content-[\'\']',
  'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
].join(' ')

export function Footer() {
  return (
    <footer className="relative min-h-svh overflow-hidden bg-[#070b12]" id="contact">
      <img
        alt=""
        className="absolute inset-0 z-0 h-full w-full scale-[1.04] object-cover object-center brightness-[0.62] grayscale-[0.22] saturate-[0.7]"
        src={footerBackground}
      />
      <div
        className="absolute inset-0 z-[1] h-full w-full bg-[linear-gradient(90deg,rgba(7,11,18,0.78)_0%,rgba(7,11,18,0.42)_48%,rgba(7,11,18,0.72)_100%),linear-gradient(180deg,rgba(7,11,18,0.76)_0%,rgba(7,11,18,0.08)_28%,rgba(7,11,18,0.82)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto grid min-h-svh w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)] grid-rows-[1fr_auto] max-[680px]:min-h-0">
        <div className="grid items-end self-end gap-[clamp(2rem,7vw,6rem)] py-[clamp(4rem,10vw,8rem)] pb-[clamp(2rem,4vw,3.25rem)] [grid-template-columns:minmax(0,1fr)_minmax(18rem,0.46fr)] max-[1024px]:grid-cols-1 max-[1024px]:items-start max-[680px]:py-[clamp(4rem,18vw,6rem)]">
          <h2 className="row-span-2 max-w-[8.8em] text-balance text-[clamp(4rem,9vw,10.5rem)] font-normal leading-[0.92] tracking-[-0.075em] max-[1024px]:row-auto max-[680px]:text-[clamp(3.2rem,17vw,5.4rem)]">
            Build what comes next.
          </h2>

          <div className="grid gap-[clamp(2rem,5vw,4rem)] [grid-template-columns:repeat(2,minmax(8rem,1fr))] max-[680px]:grid-cols-1">
            <div className="grid gap-[1.4rem]">
              <a className={footerLinkClasses} href="#work">Work</a>
              <a className={footerLinkClasses} href="#stack">Stack</a>
              <a className={footerLinkClasses} href="#culture">Culture</a>
              <a className={footerLinkClasses} href="#blog">Blog</a>
            </div>

            <div className="grid gap-[1.4rem]">
              <a className={footerLinkClasses} href="https://kodecraft.tech/" rel="noreferrer" target="_blank">
                Company
              </a>
              <a className={footerLinkClasses} href="https://www.linkedin.com/company/kodecraft" rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a className={footerLinkClasses} href="mailto:careers@kodecraft.dev">Careers</a>
              <a className={footerLinkClasses} href="#top">Back to top</a>
            </div>
          </div>

          <div className="col-start-2 row-start-2 flex items-center gap-[clamp(2rem,5vw,4rem)] self-end max-[1024px]:col-auto max-[1024px]:row-auto max-[680px]:flex-col max-[680px]:items-start">
            <a className={footerButtonClasses} href="mailto:careers@kodecraft.dev">
              Get in Touch
            </a>
            <div className="flex items-center gap-[1.35rem]" aria-label="Social links">
              <a className={footerSocialLinkClasses} href="https://www.facebook.com/" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="h-[1.6rem] w-[1.6rem]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.4-1.3H16V5.9c-.5-.1-1.3-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2h-2.3V14h2.3v7h3.1Z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a className={footerSocialLinkClasses} href="https://www.linkedin.com/company/kodecraft" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="h-[1.6rem] w-[1.6rem]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.56 9.68h2.76V18H5.56V9.68Zm4.5 0h2.64v1.14h.04c.37-.7 1.27-1.44 2.62-1.44 2.8 0 3.32 1.84 3.32 4.24V18h-2.75v-3.9c0-.93-.02-2.13-1.3-2.13-1.3 0-1.5 1.01-1.5 2.06V18h-2.76V9.68Z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-[rgba(240,245,255,0.18)] py-[1.6rem] text-[0.9rem] text-[rgba(203,213,225,0.64)] max-[680px]:flex-col max-[680px]:items-start">
          <span>© 2026 KodeCraft Technologies OPC</span>
          <span>Tayabas, Philippines</span>
        </div>
      </div>
    </footer>
  )
}
