import type { CSSProperties } from 'react'
import imageTrail1 from '../assets/imageTrail1.jpg'
import imageTrail10 from '../assets/imageTrail10.jpg'
import imageTrail12 from '../assets/imageTrail12.jpg'
import imageTrail15 from '../assets/imageTrail15.jpg'
import imageTrail18 from '../assets/imageTrail18.jpg'
import imageTrail22 from '../assets/imageTrail22.jpg'
import imageTrail27 from '../assets/imageTrail27.jpg'
import imageTrail33 from '../assets/imageTrail33.jpg'
import imageTrail39 from '../assets/imageTrail39.jpg'
import imageTrail46 from '../assets/imageTrail46.jpg'
import { teamMembers } from '../content/siteContent'

const teamImages = [
  imageTrail1,
  imageTrail10,
  imageTrail12,
  imageTrail15,
  imageTrail18,
  imageTrail22,
  imageTrail27,
  imageTrail33,
]

const orbitImages = [imageTrail39, imageTrail46, imageTrail12, imageTrail22, imageTrail27]

export function OurTeamPage() {
  return (
    <main className="team-page" id="top">
      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-grid-lines" aria-hidden="true" />
        <div className="team-orbit" aria-hidden="true">
          {orbitImages.map((image, index) => (
            <img
              alt=""
              className={`team-orbit-image team-orbit-image-${index + 1}`}
              key={image}
              src={image}
            />
          ))}
        </div>

        <div className="section-shell team-hero-shell">
          <p className="section-label team-label">Our Team</p>
          <h1 id="team-title">Your future teammates</h1>
          <p className="team-intro">
            The engineers building agent-native systems on Rust. You'll work alongside them.
          </p>
          <span className="team-scroll-cue" aria-hidden="true" />
        </div>
      </section>

      <section className="team-roster-section" aria-labelledby="team-roster-title">
        <div className="section-shell team-roster-shell">
          <p className="section-label team-label" data-reveal>
            People behind systems
          </p>
          <h2 id="team-roster-title" data-reveal>
            Builders, operators, and product-minded engineers.
          </h2>

          <div className="team-grid" aria-label="KodeCraft team members">
            {teamMembers.map((member, index) => {
              const image = member.image ?? teamImages[index % teamImages.length]

              return (
                <article
                  className="team-card"
                  data-reveal
                  key={member.name}
                  style={{ '--delay': `${index * 55}ms` } as CSSProperties}
                  tabIndex={0}
                >
                  <img alt={`${member.name}, ${member.role}`} className="team-card-image" src={image} />
                  <div className="team-card-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
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
