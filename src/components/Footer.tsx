import footerBackground from '../assets/imageTrail39.jpg'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <img alt="" className="footer-background" src={footerBackground} />
      <div className="footer-scrim" aria-hidden="true" />

      <div className="section-shell footer-shell">

        <div className="footer-main">
          <h2>Build what comes next.</h2>

          <div className="footer-links">
            <div>
              <a href="#work">Work</a>
              <a href="#stack">Stack</a>
              <a href="#culture">Culture</a>
              <a href="#blog">Blog</a>
            </div>

            <div>
              <a href="https://kodecraft.tech/" rel="noreferrer" target="_blank">
                Company
              </a>
              <a href="https://www.linkedin.com/company/kodecraft" rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a href="mailto:careers@kodecraft.dev">Careers</a>
              <a href="#top">Back to top</a>
            </div>
          </div>

          <div className="footer-action">
            <a className="footer-get-in-touch" href="mailto:careers@kodecraft.dev">
              Get in Touch
            </a>
            <div className="footer-socials" aria-label="Social links">
              <a href="https://www.linkedin.com/company/kodecraft" rel="noreferrer" target="_blank">
                in
              </a>
              <a href="https://kodecraft.tech/" rel="noreferrer" target="_blank">
                kc
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 KodeCraft Technologies OPC</span>
          <span>Tayabas, Philippines</span>
        </div>
      </div>
    </footer>
  )
}
