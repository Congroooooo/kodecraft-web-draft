import type { CSSProperties } from 'react'
import imageTrail12 from '../assets/imageTrail12.jpg?format=webp&quality=76'
import imageTrail22 from '../assets/imageTrail22.jpg?format=webp&quality=76'
import imageTrail27 from '../assets/imageTrail27.jpg?format=webp&quality=76'
import imageTrail39 from '../assets/imageTrail39.jpg?format=webp&quality=76'
import imageTrail46 from '../assets/imageTrail46.jpg?format=webp&quality=76'
import { teamMembers } from '../content/team'

const orbitImages = [imageTrail39, imageTrail46, imageTrail12, imageTrail22, imageTrail27]

const pageShellClasses = 'relative z-[2] mx-auto w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)]'
const orbitImageBaseClasses = 'absolute h-[clamp(10rem,17vw,16rem)] w-[clamp(8rem,13vw,13rem)] border border-[rgba(74,222,128,0.18)] object-cover opacity-[0.82] shadow-[0_1.5rem_5rem_rgba(0,0,0,0.32)] brightness-[0.92] contrast-[1.04] saturate-[1.02] [animation:team-float_8s_var(--ease-in-out-expo)_infinite_alternate] max-[680px]:h-[8.5rem] max-[680px]:w-[6.8rem] max-[680px]:opacity-60'
const orbitPositionClasses = [
  '[--rotate:-6deg] left-[9vw] top-[21vh] [animation-delay:-1.4s] max-[680px]:left-[5vw] max-[680px]:top-[16vh]',
  '[--rotate:5deg] right-[7vw] top-[17vh] [animation-delay:-3.2s] max-[680px]:right-[6vw] max-[680px]:top-[19vh]',
  '[--rotate:8deg] bottom-[18vh] left-[18vw] w-[clamp(11rem,19vw,19rem)] [animation-delay:-4.4s] max-[680px]:bottom-[8vh] max-[680px]:left-[5vw] max-[680px]:w-[9.2rem]',
  '[--rotate:-4deg] bottom-[16vh] right-[16vw] [animation-delay:-2.1s] max-[680px]:bottom-[9vh] max-[680px]:right-[7vw]',
  '[--rotate:4deg] left-[47vw] top-[12vh] [animation-delay:-5.2s] max-[1024px]:hidden',
]

export function OurTeamPage() {
  return (
    <main className="min-h-svh bg-[#070b14] bg-[radial-gradient(ellipse_at_50%_18%,rgba(74,222,128,0.11),transparent_38rem)]" id="top">
      <section className="relative grid min-h-svh items-center overflow-hidden py-[clamp(7.5rem,10vw,10rem)] pb-[clamp(5rem,8vw,7rem)] max-[680px]:min-h-[92svh] max-[680px]:pt-28" aria-labelledby="team-title">
        <div className="team-grid-lines" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          {orbitImages.map((image, index) => (
            <img
              alt=""
              className={`${orbitImageBaseClasses} ${orbitPositionClasses[index]}`}
              key={image}
              src={image}
            />
          ))}
        </div>

        <div className={`${pageShellClasses} max-w-[54rem] text-center max-[680px]:pt-28`}>
          <p className="section-label mb-4">Our Team</p>
          <h1 className="mx-auto max-w-[9.2em] text-[clamp(2.6rem,5vw,5.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.055em]" id="team-title">Your future teammates</h1>
          <p className="mx-auto mt-[1.35rem] max-w-[39rem] text-balance text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.45] text-[rgba(203,213,225,0.76)]">
            The engineers building agent-native systems on Rust. You'll work alongside them.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-[clamp(1.8rem,4vw,3rem)] z-[2]">
          <div className={`${pageShellClasses} flex flex-col items-center gap-3 text-center`}>
            <p className="font-kc-heading text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[rgba(203,213,225,0.68)]">
              Scroll down to meet the team below
            </p>
            <span className="block h-[1.1rem] w-[1.1rem] rotate-45 border-b border-r border-[rgba(240,245,255,0.46)]" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,rgba(7,11,20,0),#070b14_9rem),radial-gradient(ellipse_at_72%_20%,rgba(74,222,128,0.08),transparent_30rem)] py-[clamp(5rem,9vw,9rem)] pb-[clamp(7rem,10vw,10rem)]" aria-labelledby="team-roster-title">
        <div className={pageShellClasses}>
          <p className="section-label mb-4" data-reveal>
            People behind systems
          </p>
          <h2 className="max-w-[12em] text-balance text-[clamp(2.4rem,4.8vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.06em]" id="team-roster-title" data-reveal>
            Builders, operators, and product-minded engineers.
          </h2>

          <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-4 gap-[clamp(0.95rem,1.5vw,1.25rem)] text-center max-[1024px]:grid-cols-2 max-[680px]:grid-cols-1" aria-label="KodeCraft team members">
            {teamMembers.map((member, index) => {
              const initials = member.name.split(' ').filter(part => part.length > 0 && /^[A-Za-z]/.test(part)).slice(0, 2).map(part => part[0]).join('').toUpperCase()

              return (
                <article
                  className="relative aspect-[1/1.16] max-[680px]:aspect-[1/0.92]"
                  data-reveal
                  key={member.name}
                  style={{ '--delay': `${index * 55}ms` } as CSSProperties}
                >
                  <div className="group relative isolate h-full transform-gpu cursor-default overflow-hidden rounded-none border border-[rgba(148,163,184,0.08)] bg-[rgba(240,245,255,0.04)] transition-all duration-[320ms] ease-kc-out will-change-transform hover:z-[2] hover:scale-[1.045] hover:border-kc-brand hover:shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)] focus-visible:z-[2] focus-visible:scale-[1.045] focus-visible:border-kc-brand focus-visible:shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)]" tabIndex={0}>
                    {member.image ? (
                      <img alt={`${member.name}, ${member.role}`} className="absolute inset-0 z-0 h-full w-full scale-[1.04] transform-gpu object-cover brightness-[0.9] contrast-[1.05] grayscale transition-all duration-[420ms] ease-kc-out will-change-transform group-hover:scale-[1.12] group-hover:brightness-[0.84] group-hover:contrast-[1.04] group-hover:grayscale-0 group-focus-visible:scale-[1.12] group-focus-visible:brightness-[0.84] group-focus-visible:contrast-[1.04] group-focus-visible:grayscale-0" src={member.image} />
                    ) : (
                      <div className="absolute inset-0 z-0 grid place-items-center bg-[radial-gradient(ellipse_at_50%_30%,rgba(74,222,128,0.16),rgba(7,11,20,0.92)_72%)] transition-all duration-[420ms] ease-kc-out group-hover:bg-[radial-gradient(ellipse_at_50%_30%,rgba(74,222,128,0.3),rgba(7,11,20,0.92)_72%)] group-focus-visible:bg-[radial-gradient(ellipse_at_50%_30%,rgba(74,222,128,0.3),rgba(7,11,20,0.92)_72%)]" aria-hidden="true">
                        <span className="font-kc-heading text-[clamp(2.6rem,5.5vw,4.4rem)] font-bold leading-none tracking-[-0.04em] text-[rgba(240,245,255,0.92)]">{initials}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 z-[1] grid translate-y-[0.8rem] transform-gpu place-content-end justify-items-start bg-[linear-gradient(180deg,rgba(7,11,20,0),rgba(7,11,20,0.88)_58%)] p-5 text-left opacity-0 transition-all duration-[320ms] ease-kc-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-[1024px]:translate-y-0 max-[1024px]:opacity-100">
                      <h3 className="text-[clamp(1rem,1.25vw,1.2rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[rgba(240,245,255,0.94)]">{member.name}</h3>
                      <p className="mt-2 text-[clamp(0.88rem,1vw,1rem)] leading-[1.35] text-kc-brand">{member.role}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
