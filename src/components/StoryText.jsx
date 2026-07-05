import { useEffect, useState } from 'react'

/**
 * Renders narrative text the way the app should feel: quiet, then arriving.
 * Paragraphs fade in one after another. Optional `flicker` gives the
 * "the app is deciding whether to trust you" open.
 */
export default function StoryText({ text, flicker = false, className = '' }) {
  const paragraphs = String(text).trim().split(/\n\n+/)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    setShown(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= paragraphs.length) clearInterval(id)
    }, 900)
    return () => clearInterval(id)
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`story ${flicker ? 'story-flicker' : ''} ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className={`story-line ${i < shown ? 'in' : ''}`}>
          {p}
        </p>
      ))}
    </div>
  )
}
