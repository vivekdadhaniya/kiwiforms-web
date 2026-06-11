document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return

  gsap.registerPlugin(ScrollTrigger)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const pageWrappers = gsap.utils.toArray('body > div.pt-\\[61px\\]')

  const isVisible = (element) =>
    element &&
    !element.closest('[style*="display: none"]') &&
    getComputedStyle(element).display !== 'none'

  const hero = pageWrappers[0]?.querySelector('section')
  if (hero) {
    const heroPanel = hero.querySelector('.rounded-10px > div:first-child')
    const heroContent = heroPanel ? Array.from(heroPanel.children).filter(isVisible) : []
    const heroPreview = hero.querySelector('img[alt="Dashboard UI"], div[x-data*="activeTab"]')

    const loadTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.15
    })

    loadTimeline
      .from(heroContent, {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.09
      })
      .from(
        heroPreview,
        {
          autoAlpha: 0,
          y: 42,
          scale: 0.975,
          duration: 1
        },
        '-=0.45'
      )
  }

  pageWrappers.forEach((wrapper) => {
    const sections = gsap.utils.toArray('section', wrapper)

    sections.slice(1).forEach((section) => {
      const heading = section.querySelector('h2')
      const copy = heading?.parentElement
        ? Array.from(heading.parentElement.children).filter(
            (element) =>
              element !== heading &&
              isVisible(element) &&
              ['P', 'A', 'DIV'].includes(element.tagName)
          )
        : []
      const visual = section.querySelector(
        ':scope img:not([alt=""]):not(.swiper-slide img), :scope video'
      )

      if (heading) {
        gsap.from([heading, ...copy].filter(isVisible), {
          scrollTrigger: {
            trigger: heading,
            start: 'top 86%',
            once: true
          },
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }

      if (visual && isVisible(visual)) {
        gsap.from(visual, {
          scrollTrigger: {
            trigger: visual,
            start: 'top 88%',
            once: true
          },
          autoAlpha: 0,
          y: 45,
          scale: 0.98,
          duration: 0.95,
          ease: 'power3.out'
        })
      }

      const cards = Array.from(
        section.querySelectorAll('.swiper-slide, [x-data] > .bg-white, .grid > .bg-white')
      )
        .filter(isVisible)
        .slice(0, 12)

      if (cards.length > 1) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cards[0].parentElement,
            start: 'top 88%',
            once: true
          },
          autoAlpha: 0,
          y: 28,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power2.out'
        })
      }
    })
  })

  window.addEventListener('load', () => ScrollTrigger.refresh())
})
