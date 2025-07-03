import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    once = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, delay, once])

  return { elementRef, isVisible }
}

// Hook para múltiplos elementos
export const useScrollRevealList = (count: number, options: UseScrollRevealOptions = {}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false))
  const elementRefs = useRef<(HTMLElement | null)[]>([])

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    once = true
  } = options

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    elementRefs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, delay + (index * 100)) // Stagger animation
            
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setVisibleItems(prev => {
              const newState = [...prev]
              newState[index] = false
              return newState
            })
          }
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [count, threshold, rootMargin, delay, once])

  const setElementRef = (index: number) => (el: HTMLElement | null) => {
    elementRefs.current[index] = el
  }

  return { setElementRef, visibleItems }
} 