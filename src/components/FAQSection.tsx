import { faqItems } from '../content/siteContent'

export function FAQSection() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="section-shell faq-shell">
        <div className="faq-copy">
          <p className="section-label">FAQ</p>
          <h2 id="faq-title">Common inquiries</h2>
          <p>
            Everything candidates usually ask before applying. Can't find an answer?
          </p>
          <a className="button button-primary" href="#contact">
            Contact Us <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
