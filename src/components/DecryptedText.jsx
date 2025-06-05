import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DecryptedText({
  text,
  alternateText = "An Aspiring Web Developer",
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  freezeDuration = 3000, // 3 seconds in milliseconds
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isFrozen, setIsFrozen] = useState(false)
  const [currentText, setCurrentText] = useState(text)
  const containerRef = useRef(null)
  const animationTimeoutRef = useRef(null)
  const freezeTimeoutRef = useRef(null)

  const startAnimation = () => {
    setIsFrozen(false)
    setRevealedIndices(new Set())
    setIsScrambling(true)
    // Toggle between the two texts
    setCurrentText(prevText => prevText === text ? alternateText : text)
  }

  const freezeAnimation = () => {
    setIsFrozen(true)
    setIsScrambling(false)
    setDisplayText(currentText)
    setRevealedIndices(new Set(Array.from({ length: currentText.length }, (_, i) => i)))
  }

  useEffect(() => {
    let interval
    let currentIteration = 0

    const getNextIndex = (revealedSet) => {
      const textLength = currentText.length
      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const radius = Math.min(middle, textLength - middle)
          const angle = (revealedSet.size * Math.PI * 2) / textLength
          const spiralRadius = (revealedSet.size / textLength) * radius
          const nextIndex = Math.floor(middle + spiralRadius * Math.cos(angle))
          
          const validIndex = ((nextIndex % textLength) + textLength) % textLength
          if (!revealedSet.has(validIndex)) {
            return validIndex
          }
          
          for (let i = 0; i < textLength; i++) {
            const checkIndex = (validIndex + i) % textLength
            if (!revealedSet.has(checkIndex)) return checkIndex
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(currentText.split(''))).filter((char) => char !== ' ')
      : characters.split('')

    const shuffleText = (originalText, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char)

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
            ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return ' '
            if (p.isRevealed) return originalText[p.index]
            return nonSpaceChars[charIndex++]
          })
          .join('')
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (currentRevealed.has(i)) return originalText[i]
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join('')
      }
    }

    const animateText = () => {
      if (isHovering || (animateOn === 'view' && !isFrozen)) {
        interval = setInterval(() => {
          setRevealedIndices((prevRevealed) => {
            if (sequential) {
              if (prevRevealed.size < currentText.length) {
                const nextIndex = getNextIndex(prevRevealed)
                const newRevealed = new Set(prevRevealed)
                newRevealed.add(nextIndex)
                setDisplayText(shuffleText(currentText, newRevealed))
                return newRevealed
              } else {
                clearInterval(interval)
                freezeAnimation()
                // Start the freeze timer
                freezeTimeoutRef.current = setTimeout(() => {
                  startAnimation()
                }, freezeDuration)
                return prevRevealed
              }
            } else {
              setDisplayText(shuffleText(currentText, prevRevealed))
              currentIteration++
              if (currentIteration >= maxIterations) {
                clearInterval(interval)
                freezeAnimation()
                // Start the freeze timer
                freezeTimeoutRef.current = setTimeout(() => {
                  startAnimation()
                }, freezeDuration)
              }
              return prevRevealed
            }
          })
        }, speed)
      }
    }

    if (!isFrozen) {
      animateText()
    }

    return () => {
      if (interval) clearInterval(interval)
      if (freezeTimeoutRef.current) clearTimeout(freezeTimeoutRef.current)
    }
  }, [
    isHovering,
    currentText,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    animateOn,
    isFrozen,
    text,
    alternateText,
  ])

  useEffect(() => {
    if (animateOn !== 'view') return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation()
          setHasAnimated(true)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [animateOn, hasAnimated])

  const hoverProps =
    animateOn === 'hover'
      ? {
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
      }
      : {}

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || (!isHovering && isFrozen)

          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
} 