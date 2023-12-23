import React, { useLayoutEffect, useRef } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin, Power2 } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

import './Home.scss'

const HomePage = () => {
  const refQuery = {
    firstview: useRef(null),
    intro: useRef(null),
    omoty: useRef(null),
    panelTop: useRef(null),
    panelBottom: useRef(null)
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.config({ limitCallbacks: true })

      const sections = gsap.utils.toArray('.vertical-scrolling')

      const scrolling = {
        enabled: true,
        events: 'scroll,wheel,touchmove,pointermove'.split(','),
        prevent: (e) => e.preventDefault(),
        disable() {
          if (scrolling.enabled) {
            scrolling.enabled = false
            window.addEventListener('scroll', gsap.ticker.tick, { passive: true })
            scrolling.events.forEach((e, i) =>
              (i ? document : window).addEventListener(e, scrolling.prevent, {
                passive: false
              })
            )
          }
        },
        enable() {
          if (!scrolling.enabled) {
            scrolling.enabled = true
            window.removeEventListener('scroll', gsap.ticker.tick)
            scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent))
          }
        }
      }

      const goToSection = (section, index) => {
        console.log(section, index, scrolling.enabled)

        if (scrolling.enabled) {
          // skip if a scroll tween is in progress
          scrolling.disable()

          gsap.to(window, {
            scrollTo: { y: section, autoKill: false },
            onComplete: scrolling.enable,
            duration: 1
          })

          if (index === 1) {
            console.log('begin')

            gsap.fromTo(
              refQuery.firstview.current,
              {
                opacity: 1,
                ease: Power2
              },
              {
                duration: 0.5,
                opacity: 0,
                ease: Power2,
                scrollTrigger: {
                  trigger: '.vertical-2',
                  toggleActions: 'play none none reverse'
                }
              }
            )
          } else if (index === 2) {
            console.log('done')
          }

          // anim && anim.restart()
        }
      }

      sections.forEach((section, index) => {
        // const anim = gsap.from(section.querySelector(".right-col"), {yPercent: 50, duration: 1, paused: true});

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom-=1',
          end: 'bottom top+=1',
          onEnter: () => goToSection(section, index),
          onEnterBack: () => goToSection(section, index)
        })
      })
    })
    return () => ctx.revert()
  }, [refQuery.firstview])

  return (
    <>
      <FirstView refHeading={refQuery.firstview} />

      <Intro />

      <div className='fullpage'>
        <section className='vertical-scrolling vertical-1'>
          <div className='parent'>
            <div className='child'>page 1</div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-2'>
          <div className='parent'>
            <div className='child'>page 2</div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-3'>
          <div className='parent'>
            <div className='child'>page 3</div>
          </div>
        </section>

        <section className='vertical-scrolling'>
          <div className='vertical-wrapper'>
            <Projects />
            <Philosophy />
            <Company />
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
