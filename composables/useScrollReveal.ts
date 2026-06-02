import { gsap } from 'gsap'

interface ScrollRevealOptions {
  /** 动画方向 */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** 延迟（秒） */
  delay?: number
  /** 持续时间（秒） */
  duration?: number
  /** 初始偏移距离（像素） */
  distance?: number
  /** 是否只播放一次 */
  once?: boolean
}

export const useScrollReveal = (
  target: Ref<HTMLElement | null> | HTMLElement | null,
  options: ScrollRevealOptions = {}
) => {
  const {
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 40,
    once = true,
  } = options

  const getTransform = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
    }
  }

  onMounted(() => {
    const el = unref(target)
    if (!el) return

    // 设置初始状态
    gsap.set(el, {
      opacity: 0,
      ...getTransform(),
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
            })
            if (once) {
              observer.unobserve(el)
            }
          } else if (!once) {
            gsap.set(el, {
              opacity: 0,
              ...getTransform(),
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    onUnmounted(() => {
      observer.disconnect()
    })
  })
}

// 批量滚动动画：对多个元素应用交错动画
export const useScrollRevealGroup = (
  containerRef: Ref<HTMLElement | null> | HTMLElement | null,
  selector: string,
  options: ScrollRevealOptions & { stagger?: number } = {}
) => {
  const { stagger = 0.1, ...restOptions } = options

  onMounted(() => {
    const container = unref(containerRef)
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (!elements.length) return

    const getTransform = () => {
      switch (restOptions.direction || 'up') {
        case 'up': return { y: restOptions.distance || 40 }
        case 'down': return { y: -(restOptions.distance || 40) }
        case 'left': return { x: restOptions.distance || 40 }
        case 'right': return { x: -(restOptions.distance || 40) }
      }
    }

    // 设置初始状态
    gsap.set(elements, {
      opacity: 0,
      ...getTransform(),
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = (entry.target as HTMLElement).querySelectorAll(selector)
            gsap.to(children, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: restOptions.duration || 0.6,
              delay: restOptions.delay || 0,
              stagger,
              ease: 'power2.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    onUnmounted(() => {
      observer.disconnect()
    })
  })
}
