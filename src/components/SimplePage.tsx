import imageTrail10 from '../assets/imageTrail10.jpg'
import imageTrail18 from '../assets/imageTrail18.jpg'
import imageTrail24 from '../assets/imageTrail24.jpg'
import imageTrail31 from '../assets/imageTrail31.jpg'
import { pageContent } from '../content/siteContent'

type SimplePagePath = keyof typeof pageContent

type SimplePageProps = {
  path: SimplePagePath
}

const momentsContent = {
  '/events': {
    eyebrow: 'Events',
    kicker: 'Field notes',
    readTime: '6 mins read',
    title: 'Building momentum through shared engineering moments.',
    description:
      'Meetups, hiring sessions, workshops, and internal gatherings where the team learns in public and sharpens craft together.',
    recentTitle: 'Recent Events',
    recentDescription: 'Stay close to the latest KodeCraft gatherings.',
    image: imageTrail10,
    articles: [
      ['Systems Night: Agents, Rust, and Real Production Tradeoffs', 'A recap from our latest engineering meetup and the practical questions teams brought to the room.'],
      ['Inside KodeCraft Hiring Day', 'What candidates asked, what we showed, and how we think about engineering judgment.'],
      ['Community Build Session: From Idea to Working Prototype', 'A hands-on session focused on turning product instincts into shippable software.'],
    ],
  },
  '/tech-talks': {
    eyebrow: 'Tech Talks',
    kicker: 'Engineering',
    readTime: '8 mins read',
    title: 'Deep technical talks from people shipping real systems.',
    description:
      'Architecture reviews, infrastructure notes, agent workflows, and practical demos from the engineers building KodeCraft systems.',
    recentTitle: 'Recent Tech Talks',
    recentDescription: 'Systems thinking, explained by builders.',
    image: imageTrail18,
    articles: [
      ['Designing Safe MCP Tooling for Production Agents', 'How we think about permissions, guardrails, typed tools, and operational blast radius.'],
      ['Rust Service Boundaries That Stay Fast Under Load', 'A practical walkthrough of latency, ownership, and service-level decisions.'],
      ['Nomad, Deploys, and Agent Infrastructure', 'Why simple operational surfaces matter when agent workloads become real.'],
    ],
  },
  '/blog': {
    eyebrow: 'Blog',
    kicker: 'News',
    readTime: '5 mins read',
    title: 'Notes from the team building agent-native products.',
    description:
      'Essays on engineering culture, Rust infrastructure, product craft, and the decisions behind systems that reach production.',
    recentTitle: 'Recent Articles',
    recentDescription: 'Stay informed with our latest insights.',
    image: imageTrail31,
    articles: [
      ['A Day Building MCP Servers in Rust', 'What it looks like to design and ship agent tool interfaces with production constraints.'],
      ['How We Onboard Engineers at KodeCraft', 'No months of waiting. Ship code, pair closely, and own meaningful work early.'],
      ['Why Product Engineers Need Infrastructure Taste', 'Great product work depends on knowing where systems bend, fail, and scale.'],
    ],
  },
} as const

const articleImages = [imageTrail24, imageTrail10, imageTrail18]

export function SimplePage({ path }: SimplePageProps) {
  const content = pageContent[path]
  const moments = path in momentsContent ? momentsContent[path as keyof typeof momentsContent] : null

  if (moments) {
    return (
      <main className="moments-page" id="top">
        <section className="moments-hero" aria-labelledby="moments-title">
          <div className="team-grid-lines" aria-hidden="true" />

          <div className="section-shell moments-shell">
            <article className="moments-featured">
              <div className="moments-featured-media">
                <img alt="" src={moments.image} />
              </div>

              <div className="moments-featured-copy">
                <div className="moments-meta">
                  <span>{moments.kicker}</span>
                  <span>{moments.readTime}</span>
                </div>
                <h1 id="moments-title">{moments.title}</h1>
                <p>{moments.description}</p>
                <a className="moments-read-more" href="/#contact">
                  Read More <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </article>

            <div className="moments-section-head">
              <div>
                <p className="section-label">{moments.eyebrow}</p>
                <h2>{moments.recentTitle}</h2>
                <p>{moments.recentDescription}</p>
              </div>
              <div className="moments-arrows" aria-hidden="true">
                <span>-</span>
                <span>+</span>
              </div>
            </div>

            <div className="moments-card-grid">
              {moments.articles.map(([title, description], index) => (
                <article className="moments-card" key={title}>
                  <img alt="" src={articleImages[index]} />
                  <div className="moments-card-meta">
                    <span>KodeCraft</span>
                    <time dateTime="2026-06-29">29 Jun 2026</time>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a className="moments-read-more" href="/#contact">
                    Read More <span aria-hidden="true">-&gt;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="simple-page" id="top">
      <section className="simple-page-hero" aria-labelledby="simple-page-title">
        <div className="team-grid-lines" aria-hidden="true" />

        <div className="section-shell simple-page-shell">
          <p className="section-label">{content.eyebrow}</p>
          <h1 id="simple-page-title">{content.title}</h1>
          <p>{content.description}</p>
          <a className="button button-primary" href="/#contact">
            Talk to us <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>
    </main>
  )
}
