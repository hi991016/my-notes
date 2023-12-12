import React, { useEffect, useLayoutEffect, useRef } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, Power2, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  const refQuery = {
    firstview: useRef(null),
    intro: useRef(null),
    omoty: useRef(null),
    nono: useRef(null)
  }

  useEffect(() => {
    // gsap.fromTo(
    //   refQuery.firstview.current,
    //   {
    //     autoAlpha: 1,
    //     ease: Power2
    //   },
    //   {
    //     duration: 0.3,
    //     autoAlpha: 0,
    //     ease: Power2,
    //     scrollTrigger: {
    //       trigger: refQuery.intro.current,
    //       start: 'top center-=200',
    //       toggleActions: 'play none none reverse',
    //       markers: true
    //     }
    //   }
    // )
  }, [refQuery.refNono, refQuery.firstview, refQuery.intro, refQuery.omoty])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.panel')
      gsap.set(panels, {
        yPercent: (i) => (i ? 100 : 0)
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refQuery.intro.current,
          start: 'top top',
          end: () => '+=' + 60 * panels.length + '%',
          pin: true,
          scrub: 1,
          markers: true
        },
        onComplete: () => console.log('end', tl.scrollTrigger.end)
      })

      panels.forEach((panel, index) => {
        if (index) {
          tl.to(
            panel,
            {
              yPercent: 0,
              ease: 'none'
            },
            '+=0.25'
          )
        }
      })
    })

    return () => ctx.revert()
  }, [refQuery.intro])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />
      <Intro refIntro={refQuery.intro} refOmoty={refQuery.omoty} />

      <Projects />
      <Philosophy />
      <Company />
    </>
  )
}

export default HomePage
