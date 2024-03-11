import React, { useCallback, useRef } from 'react'

/* ---------------------------------- image --------------------------------- */
import dialogueImg from 'src/pages/Projects/Jincup/img/dialogue.webp'
import dialogueSpImg from 'src/pages/Projects/Jincup/img/dialogue_sp.webp'

import dialoguePhoto1 from 'src/pages/Projects/Jincup/img/dialogue_1.webp'
import dialoguePhoto2 from 'src/pages/Projects/Jincup/img/dialogue_2.webp'
import dialoguePhoto3 from 'src/pages/Projects/Jincup/img/dialogue_3.webp'
import dialoguePhoto4 from 'src/pages/Projects/Jincup/img/dialogue_4.webp'
import dialoguePhoto5 from 'src/pages/Projects/Jincup/img/dialogue_5.webp'
import dialoguePhoto6 from 'src/pages/Projects/Jincup/img/dialogue_6.webp'
import dialoguePhoto7 from 'src/pages/Projects/Jincup/img/dialogue_7.webp'

import dialogueSlide1 from 'src/pages/Projects/Jincup/img/dialogue_slide_1.webp'
import dialogueSlide2 from 'src/pages/Projects/Jincup/img/dialogue_slide_2.webp'
import dialogueSlide3 from 'src/pages/Projects/Jincup/img/dialogue_slide_3.webp'
import dialogueSlide4 from 'src/pages/Projects/Jincup/img/dialogue_slide_4.webp'
import dialogueSlide5 from 'src/pages/Projects/Jincup/img/dialogue_slide_5.webp'
import dialogueSlide6 from 'src/pages/Projects/Jincup/img/dialogue_slide_6.webp'
import dialogueSlide7 from 'src/pages/Projects/Jincup/img/dialogue_slide_7.webp'
import dialogueSlide8 from 'src/pages/Projects/Jincup/img/dialogue_slide_8.webp'
import dialogueSlide9 from 'src/pages/Projects/Jincup/img/dialogue_slide_9.webp'
import dialogueSlide10 from 'src/pages/Projects/Jincup/img/dialogue_slide_10.webp'

/* --------------------------------- swiper --------------------------------- */
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/navigation'
import 'swiper/css'

/* ---------------------------------- utils --------------------------------- */
import { dialogueData1, dialogueData2, dialogueData3 } from '../utils/dialogue-data'

import styles from '../styles/dialogue.module.scss'

const Dialogue = () => {
  const sliderRef = useRef(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  return (
    <section className={styles.dialogue} id='dialogue'>
      <div className={styles.dialogueContainer}>
        <div className={styles.dialogueImg}>
          <picture>
            <source media='(max-width:1023px)' srcSet={dialogueSpImg} />
            <img src={dialogueImg} alt='jinAKIHIRO × Yuichi Murakami' loading='lazy' />
          </picture>
        </div>

        <div className={styles.dialogueTit}>
          <div className={styles.inner}>
            <div className={styles.sticky}>
              <h2>dialogue:</h2>
              <p className={styles.name}>
                <span>j</span>inAKIHIRO × <br />
                Yuichi Murakami
              </p>
              <p className={styles.founder}>anew inc. Founder</p>
            </div>
          </div>
        </div>

        <div className={styles.dialogueWrapper}>
          <div className={styles.dialogueDesc}>
            <div className={styles.top}>
              <p>
                木工作家であり、デザイナー、プロデューサーの視点からも、モノづくりを展開するアキヒロジンと、anew inc.
                ファウンダーの村上雄一による対話。より良い世界へ向けて、頭と手を動かし、未来のジンカップを考える。
              </p>
            </div>

            <div className={styles.bottom}>
              <span>Photo: Keishi Oku</span>

              <a href='https://www.instagram.com/kcpics_kagoshima/' target='_blank' rel='noreferrer'>
                @kcpics_kagoshima
              </a>
            </div>
          </div>

          <div className={styles.dialogueContent}>
            <figure className={styles.dialogueThumb}>
              <img src={dialoguePhoto1} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
            </figure>

            <div className={styles.dialogueList}>
              {dialogueData1.map((items, i) => (
                <div className={styles.items} key={i}>
                  <h3>{items.title}</h3>
                  <p>{items.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.dialoguePhotoStyle1}>
              <figure className={styles.photo1}>
                <img src={dialoguePhoto2} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
              </figure>

              <div className={styles.flex}>
                <figure className={styles.photo2}>
                  <img src={dialoguePhoto4} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
                </figure>

                <figure className={styles.photo3}>
                  <img src={dialoguePhoto3} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
                </figure>
              </div>
            </div>

            <div className={styles.dialogueList}>
              {dialogueData2.map((items, i) => (
                <div className={styles.items} key={i}>
                  <h3>{items.title}</h3>
                  <p>{items.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.dialogueSwiper}>
              <Swiper
                cssMode={true}
                ref={sliderRef}
                modules={[Navigation]}
                spaceBetween={15}
                initialSlide='1'
                slidesPerView='auto'
                centeredSlides={true}
                centerInsufficientSlides={true}
                className={styles.dialogueSwiperWrapper}
                breakpoints={{
                  0: {
                    allowTouchMove: true
                  },
                  1024: {
                    allowTouchMove: false
                  }
                }}
                // navigation={{
                //   prevEl: styles.prev,
                //   nextEl: styles.next
                // }}
                // slideActiveClass={styles.active}
              >
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide1} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide2} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide3} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide4} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide5} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide6} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide7} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide8} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide9} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
                <SwiperSlide className={styles.dialogueSlide}>
                  <img src={dialogueSlide10} alt='PROTOTYPE' loading='lazy' />
                </SwiperSlide>
              </Swiper>

              <div className={styles.dialogueNavigation}>
                <div className={styles.prev} onClick={handlePrev}>
                  <svg
                    role='img'
                    aria-label='PREV SLIDE'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32.414'
                    height='18.828'
                    viewBox='0 0 32.414 18.828'
                  >
                    <g id='Group_231' data-name='Group 231' transform='translate(32.414 1.414) rotate(90)'>
                      <line
                        id='Line_23'
                        data-name='Line 23'
                        y2={30}
                        transform='translate(8)'
                        fill='none'
                        stroke='#5a7445'
                        strokeWidth={2}
                      />
                      <line
                        id='Line_24'
                        data-name='Line 24'
                        x1={8}
                        y1={8}
                        transform='translate(0 23)'
                        fill='none'
                        stroke='#5a7445'
                        strokeLinecap='square'
                        strokeWidth={2}
                      />
                      <line
                        id='Line_25'
                        data-name='Line 25'
                        y1={8}
                        x2={8}
                        transform='translate(8 23)'
                        fill='none'
                        stroke='#5a7445'
                        strokeLinecap='square'
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>

                <div className={styles.next} onClick={handleNext}>
                  <svg
                    role='img'
                    aria-label='NEXT SLIDE'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32.414'
                    height='18.828'
                    viewBox='0 0 32.414 18.828'
                  >
                    <g id='Group_230' data-name='Group 230' transform='translate(7653 -1388.586) rotate(90)'>
                      <line
                        id='Line_23'
                        data-name='Line 23'
                        y1={30}
                        transform='translate(1398 7623)'
                        fill='none'
                        stroke='#5a7445'
                        strokeWidth={2}
                      />
                      <line
                        id='Line_24'
                        data-name='Line 24'
                        x1={8}
                        y2={8}
                        transform='translate(1390 7622)'
                        fill='none'
                        stroke='#5a7445'
                        strokeLinecap='square'
                        strokeWidth={2}
                      />
                      <line
                        id='Line_25'
                        data-name='Line 25'
                        x2={8}
                        y2={8}
                        transform='translate(1398 7622)'
                        fill='none'
                        stroke='#5a7445'
                        strokeLinecap='square'
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.dialogueList}>
              {dialogueData3.map((items, i) => (
                <div className={styles.items} key={i}>
                  <h3>{items.title}</h3>
                  <p>{items.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.dialoguePhotoStyle2}>
              <div className={styles.flex}>
                <figure className={styles.photo2}>
                  <img src={dialoguePhoto6} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
                </figure>

                <figure className={styles.photo1}>
                  <img src={dialoguePhoto5} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
                </figure>
              </div>

              <figure className={styles.photo3}>
                <img src={dialoguePhoto7} alt='DIALOGUE: jinAKIHIRO × Yuichi Murakam' loading='lazy' />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dialogue
