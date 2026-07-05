import { useCallback, useEffect, useState } from 'react'

const KEY = 'lamplighter-progress-v1'

const EMPTY = {
  started: false,
  collected: {}, // { [emberId]: true }
  order: [], // emberIds in the sequence the player caught them
  beatsSeen: {}, // { midpoint: true, ... }
  compromises: [], // emberIds the player took a hint on ("the park remembers that you asked")
  name: '', // optional Lamplighter name for the closing screen
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    return { ...EMPTY }
  }
}

export function useProgress() {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage full or blocked — progress simply won't persist */
    }
  }, [state])

  const begin = useCallback(() => {
    setState((s) => (s.started ? s : { ...s, started: true }))
  }, [])

  const collect = useCallback((hourId) => {
    setState((s) => {
      if (s.collected[hourId]) return s
      return {
        ...s,
        collected: { ...s.collected, [hourId]: true },
        order: [...s.order, hourId],
      }
    })
  }, [])

  const markBeatSeen = useCallback((beat) => {
    setState((s) => ({ ...s, beatsSeen: { ...s.beatsSeen, [beat]: true } }))
  }, [])

  const addCompromise = useCallback((hourId) => {
    setState((s) =>
      s.compromises.includes(hourId)
        ? s
        : { ...s, compromises: [...s.compromises, hourId] }
    )
  }, [])

  const setName = useCallback((name) => {
    setState((s) => ({ ...s, name }))
  }, [])

  const reset = useCallback(() => setState({ ...EMPTY }), [])

  const count = state.order.length

  return {
    ...state,
    count,
    begin,
    collect,
    markBeatSeen,
    addCompromise,
    setName,
    reset,
  }
}
