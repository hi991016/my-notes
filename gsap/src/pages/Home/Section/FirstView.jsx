import React from 'react'

const FirstView = ({ refHeading }) => {
  return (
    <section className='firstview'>
      <div className='firstview__container'>
        <div className='firstview__heading' ref={refHeading}>
          <h2>
            Make changes in our daily lives while imagining a thousand years into the future. <span>anew</span> is a
            project team that pursues the possibilities to be <span>the good ancestor</span> from a{' '}
            <span>product sustainability</span> perspective. Having the starting point from consideration of contexts
            such as environmental crisis, culture, and economy, we research the designs and materials associated with
            objects. And we create and develop products with <span>lower environmental impact</span> that will be
            suitable for our future society.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default FirstView
