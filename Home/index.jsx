import React, { useRef, useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './section'

/* ------------------------------- components ------------------------------- */
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import './home.scss'

const HomePage = () => {
  const refIntro = useRef(null)
  const refProjects = useRef(null)
  const refNormal = useRef(null)
  const refScroll = useRef(null)
  const refFullpage = useRef(null)

  useEffect(() => {
    const scrollSnap = document.querySelectorAll('.homepage .scroll-snap')
    let mm = gsap.matchMedia(),
      breakPoint = 1024

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    ScrollTrigger.defaults({
      toggleActions: 'restart pause resume pause',
      scroller: refFullpage.current
    })

    // timeline
    const loadFirstView = gsap.timeline({
      paused: 'true',
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '#intro',
        toggleActions: 'play none none reverse'
      }
    })
    const loadIntro = gsap.timeline({
      paused: 'true',
      defaults: { duration: 0.5 },
      scrollTrigger: {
        trigger: '#intro',
        toggleActions: 'play none none reset'
      }
    })

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`
      },
      (context) => {
        let { isDesktop } = context.conditions

        loadFirstView.fromTo(
          '.homepage .firstview__heading',
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        )

        if (isDesktop) {
          loadIntro
            .to('.homepage .intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.homepage .intro__left .omoty', {
              x: 0,
              delay: 0.5
            })
            .to('.homepage .intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        } else {
          loadIntro
            .to('.homepage .intro__left', {
              opacity: 1,
              delay: 1
            })
            .to('.homepage .intro__left .omoty', {
              opacity: 0,
              duration: 0.5,
              delay: 0.5
            })
            .to('.homepage .intro__right', {
              opacity: 1,
              onComplete: () => {
                refScroll.current.classList.add('fade')
              }
            })
        }
        return () => {}
      }
    )

    // go to sections
    const sections = document.querySelectorAll('.homepage .vertical-scrolling')
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => goToSection(index),
        onEnterBack: () => goToSection(index)
      })
    })

    const goToSection = (index) => {
      refFullpage.current.classList.remove('snap-scroll')

      switch (index) {
        case 0:
          refScroll.current.classList.remove('fade')

          gsap.to('.homepage .intro__left, .homepage .intro__right, .homepage .projects', {
            opacity: 0,
            duration: 0.3
          })
          break
        case 1:
          loadFirstView.play()
          loadIntro.play()

          gsap.to('#projects', {
            opacity: 0,
            duration: 0.3
          })
          gsap.to('#intro', {
            opacity: 1,
            delay: 0.5,
            duration: 0.5
          })
          break
        case 2:
          refScroll.current.classList.add('fade')

          gsap.to('.homepage .intro', {
            opacity: 0,
            duration: 0.3
          })
          gsap.to('#projects', {
            opacity: 1,
            delay: 0.5,
            duration: 0.5
          })
          break
        case 3:
          refScroll.current.classList.remove('fade')
          refNormal.current.classList.add('fade')

          gsap.to('#projects', {
            opacity: 0,
            duration: 0.3
          })
          break

        default:
          refFullpage.current.classList.remove('snap-scroll')
          break
      }
    }

    // smooth scroll snap
    scrollSnap.forEach((scroll, i) => {
      scroll.addEventListener('wheel', function (event) {
        if (event.deltaY === 100 || event.deltaY === -100) {
          event.preventDefault()
          refFullpage.current.scrollBy({
            top: event.deltaY,
            behavior: 'smooth'
          })
        }
      })
    })

    // anchor section projects handle
    let links = document.querySelectorAll('.anchor-projects')
    links.forEach((anchor, i) => {
      anchor.addEventListener('click', (e) => {
        refFullpage.current.style.setProperty('scroll-snap-type', 'none')
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    const fullpage = document.getElementById('homepage')

    const onScroll = (e) => {
      // remove scroll-snap when into section philosophy
      if (e.currentTarget.scrollTop > refNormal.current.offsetTop) {
        fullpage.classList.add('snap-scroll')
      } else if (e.currentTarget.scrollTop === refNormal.current.offsetTop) {
        fullpage.classList.remove('snap-scroll')
      }

      // into section projects
      if (Math.round(e.currentTarget.scrollTop) === refProjects.current.offsetTop) {
        fullpage.style.setProperty('scroll-snap-type', '')
        gsap.to('#projects', {
          opacity: 1,
          duration: 0.5
        })
      }
    }
    // clean up code
    fullpage.removeEventListener('scroll', onScroll)
    fullpage.addEventListener('scroll', onScroll, { passive: true })
    return () => fullpage.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Header />
      <div className='homepage fullpage' id='homepage' ref={refFullpage}>
        <div className='c-scroll' ref={refScroll}>
          <div className='line'>
            <span></span>
          </div>
        </div>

        <section className='vertical-scrolling scroll-snap vertical-firstview'>
          <FirstView />
        </section>

        <section className='vertical-scrolling scroll-snap vertical-intro' ref={refIntro}>
          <Intro />
        </section>

        <section className='vertical-scrolling scroll-snap vertical-projects' ref={refProjects}>
          <Projects />
        </section>

        <section className='vertical-scrolling vertical-normal' ref={refNormal}>
          <Philosophy />
          <Company />
          <Footer />
        </section>
      </div>
    </>
  )
}

export default HomePage
