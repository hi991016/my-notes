import React, { useRef, useEffect } from 'react'

/* ---------------------------------- gsap ---------------------------------- */
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

/* --------------------------------- section -------------------------------- */
import { FirstView, Intro, Projects, Philosophy, Company } from './Section'

/* ------------------------------- components ------------------------------- */
import Footer from 'src/components/Footer'

import ReactFullpage from '@fullpage/react-fullpage'
import { pluginWrapper } from '@fullpage/react-fullpage'

import './Home.scss'
import Test from './Section/Test'

const HomePage = () => {
  const refProjects = useRef(null)
  const refNormal = useRef(null)
  const refScroll = useRef(null)

  const SEL = 'section'
  const SECTION_SEL = `.${SEL}`

  const helloFunc = (currentIndex, nextIndex) => {
    console.log('currentIndex', currentIndex)
    let mm = gsap.matchMedia(),
      breakPoint = 1024

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    ScrollTrigger.config({ limitCallbacks: true })

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
                document.querySelector('.c-scroll').classList.add('fade')
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
                document.querySelector('.c-scroll').classList.add('fade')
              }
            })
        }

        return () => {
          // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
          // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
        }
      }
    )

    if (currentIndex === 0) {
      document.querySelector('.c-scroll').classList.remove('fade')
    }

    if (currentIndex === 1) {
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

    if (currentIndex === 2) {
      document.querySelector('.c-scroll').classList.add('fade')

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

    if (currentIndex === 3) {
      gsap.to('.projects__title', {
        opacity: 0,
        duration: 0.3
      })

      document.querySelector('.c-scroll').classList.remove('fade')
      setTimeout(() => {
        document.querySelector('.hello').classList.add('fade')
      }, 500)
    } else {
      document.querySelector('.hello').classList.remove('fade')
    }
  }

  return (
    <>
      <ReactFullpage
        //fullpage options
        licenseKey={'YOUR_KEY_HERE'}
        scrollingSpeed={1000} /* Options here */
        // pluginWrapper={pluginWrapper}
        // recordHistory={false}
        // scrollOverflow={true}
        navigation={true}
        // navigationPosition={'right'}
        // anchors={['firstview', 'intro', 'projects', 'test']}
        // sectionSelector={SECTION_SEL}
        afterLoad={helloFunc}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className='c-scroll' ref={refScroll}>
                <div className='line'>
                  <span></span>
                </div>
              </div>

              <div className='section'>
                <FirstView />
              </div>
              <div className='section'>
                <Intro />
              </div>
              <div className='section'>
                <Projects />
              </div>
              <div className='section hello'>
                <Test />
              </div>
              {/* <FirstView />
              <Intro />
              <Projects /> */}
              {/* <Test /> */}
            </ReactFullpage.Wrapper>
          )
        }}
      />

      {/* <div className='fullpage'>
        <div className='c-scroll' ref={refScroll}>
          <div className='line'>
            <span></span>
          </div>
        </div>

        <section className='vertical-scrolling scroll-snap vertical-firstview'>
          <FirstView />
        </section>

        <section className='vertical-scrolling scroll-snap vertical-intro'>
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
      </div> */}
    </>
  )
}

export default HomePage
