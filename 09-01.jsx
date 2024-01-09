import React, { useRef, useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  const refProjects = useRef(null)
  const refNormal = useRef(null)
  const refScroll = useRef(null)

  useEffect(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 1024

    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: '.fullpage'
    })

    const loadFirstView = gsap.timeline({
      paused: 'true',
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reverse'
      }
    })
    const loadIntro = gsap.timeline({
      paused: 'true',
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '.intro',
        toggleActions: 'play none none reset'
      }
    })

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop } = context.conditions

        loadFirstView.fromTo(
          '.firstview__heading',
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        )

        if (isDesktop) {
          loadIntro
            .to('.intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.intro__left .omoty', {
              x: 0,
              delay: 0.5
            })
            .to('.intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        } else {
          loadIntro
            .to('.intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.intro__left .omoty', {
              opacity: 0,
              duration: 0.5,
              delay: 0.5
            })
            .to('.intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        }

        return () => {
          // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
          // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
        }
      }
    )

    const sections = document.querySelectorAll('.vertical-scrolling')

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => goToSection(section, i),
        onEnterBack: () => goToSection(section, i)
      })
    })

    const goToSection = (section, i) => {
      if (i === 0) {
        refScroll.current.classList.remove('fade')
      }

      if (i === 1) {
        loadFirstView.play()
        loadIntro.play()

        gsap.to('.intro', {
          opacity: 1,
          delay: 1,
          duration: 0.5
        })
        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.5
        })
      }

      if (i === 2) {
        refScroll.current.classList.add('fade')

        gsap.to('.intro', {
          opacity: 0,
          duration: 0.5
        })
        gsap.to('.projects__title', {
          opacity: 1,
          delay: 1,
          duration: 0.5
        })
      }

      if (i === 3) {
        gsap.to('.projects__title', {
          opacity: 0,
          duration: 0.3
        })

        setTimeout(() => {
          refNormal.current.classList.add('fade')
        }, 500)
        refScroll.current.classList.remove('fade')
      } else {
        refNormal.current.classList.remove('fade')
      }
    }
  }, [])

  return (
    <>
      <div className='fullpage'>
        <div className='c-scroll' ref={refScroll}>
          <div className='line'>
            <span></span>
          </div>
        </div>

        <section className='vertical-scrolling vertical-firstview'>
          <FirstView />
        </section>

        <section className='vertical-scrolling vertical-intro'>
          <Intro />
        </section>

        <section className='vertical-scrolling vertical-projects' ref={refProjects}>
          <Projects />
        </section>

        <section className='vertical-scrolling vertical-normal' ref={refNormal}>
          <Philosophy />
          <Company />
        </section>
      </div>
    </>
  )
}

export default HomePage
