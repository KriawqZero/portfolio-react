import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef(400)
  const targetSizeRef = useRef(400)
  const opacityRef = useRef(1)
  const targetOpacityRef = useRef(1)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, textarea, .tech-tag') !== null
      
      if (isInteractive) {
        targetSizeRef.current = 600
        targetOpacityRef.current = 1.5
      } else {
        targetSizeRef.current = 400
        targetOpacityRef.current = 1
      }
    }

    let rafId: number

    const animate = () => {
      const lerp = 0.08
      const lerpSize = 0.05
      
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp
      
      sizeRef.current += (targetSizeRef.current - sizeRef.current) * lerpSize
      opacityRef.current += (targetOpacityRef.current - opacityRef.current) * lerpSize

      if (glowRef.current) {
        const s = sizeRef.current
        glowRef.current.style.transform = `translate3d(${posRef.current.x - s/2}px, ${posRef.current.y - s/2}px, 0)`
        glowRef.current.style.width = `${s}px`
        glowRef.current.style.height = `${s}px`
        glowRef.current.style.opacity = `${opacityRef.current}`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(63, 24, 171, 0.1) 0%, rgba(63, 24, 171, 0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform, width, height, opacity',
        mixBlendMode: 'screen',
      }}
    />
  )
}
