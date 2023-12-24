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

          // if (index === 0) {
          //   document.querySelector('.intro').classList.remove('no-transition')
          //   document.querySelector('.intro').classList.remove('show')
          //   document.querySelector('.firstview__heading').classList.remove('hide')
          // }

          // if (index === 1) {
          //   document.querySelector('.intro').classList.remove('no-transition')
          //   document.querySelector('.firstview__heading').classList.add('hide')
          //   document.querySelector('.intro').classList.add('show')

          //   //   gsap.to('.intro__bottom', {
          //   //     opacity: 0,
          //   //     duration: 0.5
          //   //   })

          //   //   setTimeout(() => {
          //   //     document.querySelector('.intro').classList.add('show')
          //   //   }, 500)

          //   //   const tl1 = gsap
          //   //     .timeline({
          //   //       paused: true,
          //   //       ease: Power2,
          //   //       scrollTrigger: {
          //   //         trigger: '.vertical-scrolling.vertical-2',
          //   //         toggleActions: 'play none none reverse'
          //   //       }
          //   //     })
          //   // .to('.intro__left .omoty', {
          //   //   opacity: 1,
          //   //   duration: 1
          //   // })
          //   // .to('.intro__head', {
          //   //   y: 0,
          //   //   opacity: 1,
          //   //   duration: 0.5
          //   // })
          //   // .to('.text-reveal .animation-1', {
          //   //   y: '0',
          //   //   duration: 0.5
          //   // })
          //   // .to(
          //   //   '.text-reveal .animation-2',
          //   //   {
          //   //     y: '0',
          //   //     duration: 0.5
          //   //   },
          //   //   '-=0.2'
          //   // )
          //   // .to('.text-reveal .animation-3', {
          //   //   y: '0',
          //   //   duration: 0.5
          //   // })
          // }

          // // if (index === 2) {
          // //   document.querySelector('.intro').classList.remove('no-transition')
          // //   setTimeout(() => {
          // //     document.querySelector('.intro').classList.add('show')
          // //   }, 500)

          // //   gsap
          // //     .timeline({
          // //       paused: true,
          // //       ease: Power2,
          // //       scrollTrigger: {
          // //         trigger: '.vertical-scrolling.vertical-3',
          // //         toggleActions: 'play none none reverse'
          // //       }
          // //     })
          // //     .fromTo(
          // //       '.intro__head',
          // //       {
          // //         y: 0
          // //       },
          // //       {
          // //         y: -120,
          // //         duration: 0.5
          // //       }
          // //     )
          // //     .to('.intro__bottom', {
          // //       opacity: 1,
          // //       duration: 0.5
          // //     })
          // // }

          // if (index === 3) {
          //   document.querySelector('.intro').classList.add('no-transition')
          //   document.querySelector('.intro').classList.remove('show')
          // }

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
            <div className='child'></div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-2'>
          <div className='parent'>
            <div className='child'></div>
          </div>
        </section>
        <section className='vertical-scrolling vertical-3'>
          <div className='parent'>
            <div className='child'></div>
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
