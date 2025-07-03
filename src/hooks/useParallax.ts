import { useEffect, useRef, useState } from 'react'

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const element = elementRef.current
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + scrolled
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        
        // Calculate parallax offset only when element is in viewport
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const parallax = (scrolled - elementTop) * speed
          setOffset(parallax)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return { elementRef, offset }
}

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    let lastScrollY = window.pageYOffset
    
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction)
      }
      
      setScrollY(scrollY)
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    
    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [scrollDirection])
  
  return { scrollDirection, scrollY }
} 