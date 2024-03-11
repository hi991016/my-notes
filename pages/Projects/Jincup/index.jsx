import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

/* -------------------------------- component ------------------------------- */
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

/* --------------------------------- section -------------------------------- */
import { Mainvisual, Overview, Dialogue, Prototype } from './section'

const JincupPage = () => {
  useEffect(() => {
    let currentTheme = localStorage.getItem('data-theme')
    if (!currentTheme) currentTheme = 'light'
    if (currentTheme) currentTheme = 'light'

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${document.documentElement.clientHeight}px`)
    }
    appHeight()
    window.addEventListener('resize', appHeight)
    return () => window.removeEventListener('resize', appHeight)
  }, [])

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>jincup anew ｜ PROJECTS ｜ anew inc.</title>
        </Helmet>

        <Loading />

        <Header />
        <main className='jincuppage' id='jincuppage'>
          <Mainvisual />
          <Overview />
          <Dialogue />
          <Prototype />
        </main>
        <Footer />
      </HelmetProvider>
    </>
  )
}

export default JincupPage
