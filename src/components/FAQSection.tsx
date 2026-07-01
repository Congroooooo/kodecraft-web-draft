import { faqItems } from '../content/faq'

const faqCtaClasses = [
  'group mt-6 inline-flex min-h-[3.35rem] w-fit items-center justify-center gap-3 rounded-none bg-kc-brand px-[1.45rem]',
  'font-kc-heading text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#07100b]',
  'transition-[background,box-shadow,transform] duration-300 ease-kc-out',
  'hover:-translate-y-0.5 hover:bg-[#16a34a] hover:shadow-[0_0_2.4rem_rgba(74,222,128,0.27)]',
  'focus-visible:-translate-y-0.5 focus-visible:bg-[#16a34a] focus-visible:shadow-[0_0_2.4rem_rgba(74,222,128,0.27)]',
].join(' ')

export function FAQSection() {
  return (
    <section
      className="border-t border-[rgba(148,163,184,0.12)] bg-[#070b14] bg-[radial-gradient(ellipse_at_12%_20%,rgba(74,222,128,0.08),transparent_32rem)] py-[clamp(5.5rem,9vw,9rem)] scroll-mt-kc-header"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="relative z-[2] mx-auto grid w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)] gap-[clamp(2rem,5vw,5rem)] [grid-template-columns:minmax(18rem,0.72fr)_minmax(0,1.28fr)] max-[1024px]:grid-cols-1">
        <div className="grid min-h-[34rem] content-start max-[1024px]:min-h-0">
          <p className="section-label mb-8 max-[680px]:mb-6">FAQ</p>
          <h2
            className="max-w-[6em] text-[clamp(3.25rem,6.6vw,7rem)] font-medium leading-[0.98] tracking-[-0.06em]"
            id="faq-title"
          >
            Common inquiries
          </h2>
          <p className="mt-12 max-w-[35rem] text-[clamp(1rem,1.2vw,1.08rem)] leading-[1.65] text-[rgba(203,213,225,0.78)] max-[680px]:mt-10">
            Everything candidates usually ask before applying. Can't find an answer?
          </p>
          <a className={faqCtaClasses} href="#contact">
            Contact Us
            <span className="transition-transform duration-300 ease-kc-out group-hover:translate-x-[0.28rem]" aria-hidden="true">
              -&gt;
            </span>
          </a>
        </div>

        <div className="border-l border-t border-[rgba(148,163,184,0.14)] max-[680px]:border-l-0">
          {faqItems.map((item, index) => (
            <details className="group border-b border-[rgba(148,163,184,0.14)]" key={item.question} open={index === 0}>
              <summary className="flex min-h-[5.4rem] cursor-pointer list-none items-center justify-between gap-5 px-[clamp(1.2rem,2.5vw,2.25rem)] py-[1.4rem] text-[clamp(1rem,1.25vw,1.18rem)] font-semibold leading-[1.35] text-[rgba(240,245,255,0.9)] transition-[background,color] duration-200 ease-kc-out marker:hidden hover:bg-[rgba(74,222,128,0.08)] hover:text-kc-text focus-visible:bg-[rgba(74,222,128,0.08)] focus-visible:text-kc-text [&::-webkit-details-marker]:hidden max-[680px]:min-h-0 max-[680px]:items-start">
                <span>{item.question}</span>
                <span
                  className="relative h-[1.35rem] w-[1.35rem] flex-none rounded-full border border-[rgba(240,245,255,0.72)] before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-[0.58rem] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-px after:w-[0.58rem] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-200 after:ease-kc-out after:content-[''] group-open:after:rotate-0"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[58rem] px-[clamp(1.2rem,2.5vw,2.25rem)] pb-6 leading-[1.7] text-[rgba(203,213,225,0.78)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
