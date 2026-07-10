import { useRef } from 'react'
import { buildItems } from '../content/home/build'
import { useBuildScrollChoreography } from '../hooks/useBuildScrollChoreography'
import buildImage1 from '../assets/whatWeBuild1.png?format=webp&quality=82'
import buildImage2 from '../assets/whatWeBuild2.png?format=webp&quality=82'
import buildImage3 from '../assets/whatWeBuild3.png?format=webp&quality=82'
import buildImage4 from '../assets/whatWeBuild4.png?format=webp&quality=82'

// Placeholder image holders, one per build item (index-aligned with buildItems).
const buildImages = [buildImage1, buildImage2, buildImage3, buildImage4]

export function BuildSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useBuildScrollChoreography(sectionRef, buildItems.length)

  return (
    <section className="build-section" id="work" aria-labelledby="build-title" ref={sectionRef}>
      <div className="build-stage">
        <div className="section-shell build-shell">
          <p className="section-label build-eyebrow" id="build-title">
            <span>What we build</span>
          </p>

          <div className="build-frame">
            <span className="build-connector" aria-hidden="true" />
            <span className="build-progress-dot" aria-hidden="true" />

            <div className="build-media-panel">
              <div className="build-media-tags" aria-hidden="true">
                {buildItems.map((item) => (
                  <p className="build-media-tag" key={item.title}>
                    <span>{item.index}</span>
                    {item.category}
                  </p>
                ))}
              </div>

              <div className="build-media" aria-hidden="true">
                {buildItems.map((item, index) => (
                  <img
                    alt=""
                    className="build-media-image"
                    draggable="false"
                    key={item.title}
                    loading="lazy"
                    src={buildImages[index % buildImages.length]}
                  />
                ))}
              </div>

              <div className="build-captions" aria-hidden="true">
                {buildItems.map((item) => (
                  <p className="build-caption" key={item.title}>
                    {item.caption}
                  </p>
                ))}
              </div>
            </div>

            <div className="build-right">
              <div className="build-copy-panel">
                <div className="build-track">
                  {buildItems.map((item, index) => (
                    <article className="build-item" data-index={index} key={item.title}>
                      <img
                        alt=""
                        aria-hidden="true"
                        className="build-item-media"
                        draggable="false"
                        loading="lazy"
                        src={buildImages[index % buildImages.length]}
                      />
                      <h3>{item.title}</h3>
                      <span>{item.text}</span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="build-lower">
                <ul className="build-nav">
                  {buildItems.map((item) => (
                    <li className="build-nav-item" key={item.title}>
                      <span className="build-nav-index">{item.index}</span>
                      <span className="build-nav-label">{item.category}</span>
                    </li>
                  ))}
                </ul>

                <div className="build-tag-panel" aria-hidden="true">
                  {buildItems.map((item) => (
                    <p className="build-tag" key={item.title}>
                      <span>{item.index}</span>
                      {item.tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
