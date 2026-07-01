import { useEffect, useState } from 'react'
import { pageContent } from '../content/pages'
import { momentPageCopy, moments, type Moment } from '../content/moments'

type SimplePagePath = keyof typeof pageContent

type SimplePageProps = {
  path: SimplePagePath
}

const pageShellClasses = 'relative z-[2] mx-auto w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)]'
const momentActionClasses = 'group mt-[1.35rem] inline-flex cursor-pointer appearance-none gap-2 border-0 bg-transparent p-0 text-[0.88rem] font-extrabold uppercase tracking-[0.04em] text-kc-brand'
const momentImageClasses = 'aspect-[1.55/1] h-auto w-full object-cover brightness-[0.78] contrast-[1.04] saturate-[0.72]'
const momentMetaPillClasses = 'border border-[rgba(74,222,128,0.22)] bg-[rgba(74,222,128,0.12)] px-[0.7rem] py-[0.38rem] text-[0.78rem] font-bold text-kc-brand'
const primaryButtonClasses = 'group mt-[2.2rem] inline-flex min-h-[3.35rem] items-center gap-3 rounded-none bg-kc-brand px-[1.45rem] font-kc-heading text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#07100b] transition-[background,box-shadow,transform] duration-300 ease-kc-out hover:-translate-y-0.5 hover:bg-[#16a34a] hover:shadow-[0_0_2.4rem_rgba(74,222,128,0.27)] focus-visible:-translate-y-0.5 focus-visible:bg-[#16a34a] focus-visible:shadow-[0_0_2.4rem_rgba(74,222,128,0.27)]'

export function SimplePage({ path }: SimplePageProps) {
  const content = pageContent[path]
  const pageMoments = path in momentPageCopy ? momentPageCopy[path as keyof typeof momentPageCopy] : null
  const items = pageMoments ? moments.filter((moment) => moment.type === pageMoments.type) : []
  const featured = items[0]
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null)

  useEffect(() => {
    if (!selectedMoment) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMoment(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedMoment])

  if (pageMoments) {
    return (
      <main className="min-h-svh bg-[#070b14] bg-[linear-gradient(90deg,rgba(74,222,128,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(74,222,128,0.05)_1px,transparent_1px),radial-gradient(ellipse_at_18%_8%,rgba(74,222,128,0.08),transparent_34rem),radial-gradient(ellipse_at_78%_22%,rgba(16,185,129,0.08),transparent_34rem)] bg-[length:7rem_100%,100%_4.4rem,auto,auto]" id="top">
        <section className="relative overflow-hidden py-[clamp(8rem,11vw,11rem)] pb-[clamp(6rem,9vw,9rem)] max-[680px]:pt-28" aria-labelledby="moments-title">
          <div className="team-grid-lines" aria-hidden="true" />

          <div className={`${pageShellClasses} grid gap-[clamp(4.5rem,8vw,7.5rem)]`}>
            <article className="grid items-center gap-[clamp(2rem,5vw,4rem)] [grid-template-columns:minmax(0,0.95fr)_minmax(0,1fr)] max-[1024px]:grid-cols-1">
              <div className="border border-[rgba(148,163,184,0.14)] bg-[rgba(240,245,255,0.06)] p-[0.8rem] shadow-[0_2rem_5rem_rgba(0,0,0,0.28)]">
                {featured ? <img className={momentImageClasses} alt="" src={featured.images[0]} /> : null}
              </div>

              <div className="grid justify-items-start border border-[rgba(148,163,184,0.12)] bg-[rgba(15,23,42,0.44)] p-[clamp(1.5rem,3vw,3rem)]">
                <div className="mb-5 flex items-center gap-[0.65rem]">
                  <span className={momentMetaPillClasses}>{pageMoments.kicker}</span>
                  <span className="border border-[rgba(148,163,184,0.16)] bg-[rgba(148,163,184,0.12)] px-[0.7rem] py-[0.38rem] text-[0.78rem] font-bold text-[rgba(203,213,225,0.8)]">{items.length} posts</span>
                </div>
                <h1 className="text-balance text-[clamp(2.6rem,4.7vw,5.35rem)] font-semibold leading-[0.96] tracking-[-0.07em]" id="moments-title">{content.title}</h1>
                <p className="mt-5 max-w-[44rem] leading-[1.65] text-[rgba(203,213,225,0.74)]">{content.description}</p>
                {featured ? (
                  <button className={momentActionClasses} type="button" onClick={() => setSelectedMoment(featured)}>
                    View Featured <span className="transition-transform duration-300 ease-kc-out group-hover:translate-x-[0.28rem]" aria-hidden="true">-&gt;</span>
                  </button>
                ) : null}
              </div>
            </article>

            <div className="flex items-end justify-between gap-8 max-[680px]:items-start max-[680px]:flex-col">
              <div>
                <p className="section-label">{pageMoments.eyebrow}</p>
                <h2 className="mt-3 text-[clamp(2rem,3vw,3.2rem)] font-semibold tracking-[-0.055em]">{pageMoments.recentTitle}</h2>
                <p className="mt-2 leading-[1.65] text-[rgba(203,213,225,0.74)]">{pageMoments.recentDescription}</p>
              </div>
              <p className="font-kc-heading text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-[rgba(203,213,225,0.68)]">{items.length} total</p>
            </div>

            {items.length > 0 ? (
              <div className="grid gap-[clamp(1.25rem,2.2vw,2rem)] grid-cols-3 max-[1024px]:grid-cols-2 max-[680px]:grid-cols-1">
                {items.map((item) => (
                  <article className="flex flex-col border border-[rgba(148,163,184,0.1)] bg-[rgba(15,23,42,0.5)] p-[0.75rem] pb-[1.1rem]" key={item.id}>
                    <button className="block w-full cursor-pointer appearance-none overflow-hidden border-0 bg-transparent p-0" type="button" onClick={() => setSelectedMoment(item)}>
                      <img className={`${momentImageClasses} transition-[filter,transform] duration-300 ease-kc-out hover:scale-[1.04] hover:brightness-[0.9] hover:contrast-[1.08] hover:saturate-[0.9]`} alt="" src={item.images[0]} />
                    </button>
                    <div className="mt-[1.1rem] flex items-center justify-between text-[0.8rem] text-[rgba(203,213,225,0.62)]">
                      <span className="font-extrabold text-kc-brand">KodeCraft</span>
                      <span>{item.dateLabel ?? item.location ?? `${item.images.length} photos`}</span>
                    </div>
                    <h3 className="mt-3 text-[clamp(1.2rem,1.6vw,1.65rem)] font-bold leading-[1.12] tracking-[-0.045em]">{item.title}</h3>
                    <p className="mt-3 text-[0.94rem] leading-[1.65] text-[rgba(203,213,225,0.74)]">{item.description}</p>
                    <button className={momentActionClasses} type="button" onClick={() => setSelectedMoment(item)}>
                      View Images <span className="transition-transform duration-300 ease-kc-out group-hover:translate-x-[0.28rem]" aria-hidden="true">-&gt;</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-[rgba(148,163,184,0.12)] p-[clamp(2rem,4vw,3.5rem)] text-[rgba(203,213,225,0.72)]">
                <h2 className="mb-3 text-[clamp(1.7rem,2.4vw,2.6rem)] tracking-[-0.04em] text-kc-text">{pageMoments.emptyTitle}</h2>
                <p>Once LinkedIn post content is ready for this category, it can be added here.</p>
              </div>
            )}
          </div>
        </section>

        {selectedMoment ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(1rem,3vw,2rem)]" role="dialog" aria-modal="true" aria-labelledby="moments-modal-title">
            <button className="absolute inset-0 cursor-pointer appearance-none border-0 bg-[rgba(3,7,18,0.78)] p-0" type="button" aria-label="Close image viewer" onClick={() => setSelectedMoment(null)} />
            <div className="moments-modal-panel relative max-h-[min(86svh,58rem)] w-full max-w-[min(72rem,100%)] overflow-auto border border-[rgba(148,163,184,0.18)] bg-[rgba(7,11,20,0.96)] p-[clamp(1rem,2.5vw,2rem)] shadow-[0_2rem_5rem_rgba(0,0,0,0.42)] [scrollbar-color:rgba(74,222,128,0.58)_rgba(15,23,42,0.92)] [scrollbar-width:thin]">
              <div className="mb-6 flex items-start justify-between gap-6 max-[680px]:flex-col">
                <div>
                  <p className="section-label">{pageMoments.eyebrow}</p>
                  <h2 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-[-0.055em]" id="moments-modal-title">{selectedMoment.title}</h2>
                  <p className="mt-3 max-w-[52rem] leading-[1.6] text-[rgba(203,213,225,0.74)]">{selectedMoment.description}</p>
                </div>
                <button className="flex-none cursor-pointer appearance-none border border-[rgba(74,222,128,0.24)] bg-[rgba(74,222,128,0.12)] px-4 py-3 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-kc-brand" type="button" onClick={() => setSelectedMoment(null)}>
                  Close
                </button>
              </div>
              <div className="columns-2 gap-4 max-[680px]:columns-1">
                {selectedMoment.images.map((image, index) => (
                  <img
                    className="mb-4 block h-auto w-full break-inside-avoid bg-[rgba(240,245,255,0.06)] object-cover"
                    alt={`${selectedMoment.title} ${index + 1}`}
                    key={image}
                    src={image}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-[#070b14] bg-[radial-gradient(ellipse_at_72%_8%,rgba(74,222,128,0.1),transparent_36rem)]" id="top">
      <section className="relative grid min-h-svh items-center overflow-hidden py-[clamp(7.5rem,10vw,10rem)] pb-[clamp(5rem,8vw,7rem)]" aria-labelledby="simple-page-title">
        <div className="team-grid-lines" aria-hidden="true" />

        <div className={`${pageShellClasses} grid max-w-[58rem] justify-items-start`}>
          <p className="section-label">{content.eyebrow}</p>
          <h1 className="mt-4 text-balance text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.07em]" id="simple-page-title">{content.title}</h1>
          <p className="mt-[1.4rem] max-w-[42rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.65] text-[rgba(203,213,225,0.78)]">{content.description}</p>
          <a className={primaryButtonClasses} href="/#contact">
            Talk to us <span className="transition-transform duration-300 ease-kc-out group-hover:translate-x-[0.28rem]" aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>
    </main>
  )
}
