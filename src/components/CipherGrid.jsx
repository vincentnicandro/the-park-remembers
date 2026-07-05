import { useState, useRef, useEffect } from 'react'

/**
 * CipherGrid — the Fantasyland puzzle interface.
 * Numbers 1–8 can be tapped to assign colors via a sudoku-style popup.
 * Numbers 1–4 are row headers, 5–8 are column headers.
 * The body contains letters. Below, encoded color pairs show the message.
 */

const PALETTE = [
  { id: 'orange', hex: '#ff9b38' },
  { id: 'pink', hex: '#ff8fc7' },
  { id: 'cyan', hex: '#37e3f2' },
  { id: 'red', hex: '#ff5f68' },
  { id: 'blue', hex: '#2071f3' },
  { id: 'purple', hex: '#9562e0' },
  { id: 'yellow', hex: '#fcd20a' },
  { id: 'green', hex: '#5bdd00' },
]

const GRID_LETTERS = [
  ['S', 'B', 'M', 'C'],
  ['E', 'A', 'F', 'L'],
  ['W', 'G', 'O', 'H'],
  ['L', 'R', 'K', 'D'],
]

const ENCODED_PAIRS = [
  ['#ff9b38', '#ff8fc7'],
  ['#ff9b38', '#9562e0'],
  ['#37e3f2', '#fcd20a'],
  ['#37e3f2', '#5bdd00'],
  ['#2071f3', '#ff8fc7'],
  ['#ff5f68', '#ff8fc7'],
  ['#ff5f68', '#9562e0'],
  ['#2071f3', '#fcd20a'],
  ['#37e3f2', '#5bdd00'],
  ['#2071f3', '#5bdd00'],
]

export default function CipherGrid() {
  const [assignments, setAssignments] = useState({
    1: null, 2: null, 3: null, 4: null,
    5: null, 6: null, 7: null, 8: null,
  })
  const [activeCell, setActiveCell] = useState(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const gridRef = useRef(null)

  const handleNumberTap = (num, e) => {
    if (activeCell === num) {
      setActiveCell(null)
      return
    }
    // Position popup near the tapped cell
    const rect = e.currentTarget.getBoundingClientRect()
    const gridRect = gridRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    setPopupPos({
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height + 8,
    })
    setActiveCell(num)
  }

  const handleColorPick = (color) => {
    if (activeCell !== null) {
      setAssignments((prev) => ({ ...prev, [activeCell]: color.hex }))
      setActiveCell(null)
    }
  }

  const clearCell = () => {
    if (activeCell !== null) {
      setAssignments((prev) => ({ ...prev, [activeCell]: null }))
      setActiveCell(null)
    }
  }

  // Close popup on outside tap
  useEffect(() => {
    if (activeCell === null) return
    const handler = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setActiveCell(null)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [activeCell])

  const renderNumberCell = (num) => {
    const assigned = assignments[num]
    return (
      <div
        key={`num-${num}`}
        className={`cipher-num-cell ${activeCell === num ? 'cipher-num-cell--active' : ''} ${!assigned ? 'cipher-num-cell--pulse' : ''}`}
        onClick={(e) => handleNumberTap(num, e)}
      >
        {assigned ? (
          <span className="cipher-assigned-dot" style={{ background: assigned }} />
        ) : (
          <span className="cipher-num-label">{num}</span>
        )}
      </div>
    )
  }

  const clearAll = () => {
    setAssignments({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null })
    setActiveCell(null)
  }

  return (
    <div className="cipher" ref={gridRef}>
      {/* The grid */}
      <div className="cipher-grid">
        {/* Header row: empty corner + column numbers 5–8 */}
        <div className="cipher-cell-empty" />
        {[5, 6, 7, 8].map((colNum) => (
          <div key={colNum} className="cipher-col-header">
            {renderNumberCell(colNum)}
          </div>
        ))}

        {/* Body rows: row number + 4 letter cells */}
        {[1, 2, 3, 4].map((rowNum, rowIdx) => (
          <div key={`row-${rowNum}`} className="cipher-row">
            <div className="cipher-row-header">
              {renderNumberCell(rowNum)}
            </div>
            {GRID_LETTERS[rowIdx].map((letter, colIdx) => (
              <div key={`${rowIdx}-${colIdx}`} className="cipher-letter-cell">
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Sudoku-style color popup */}
      {activeCell !== null && (
        <div
          className="cipher-popup"
          style={{
            left: `${popupPos.x}px`,
            top: `${popupPos.y}px`,
          }}
        >
          <div className="cipher-popup-grid">
            {PALETTE.map((c) => (
              <button
                key={c.id}
                className="cipher-popup-btn"
                style={{ background: c.hex }}
                onClick={() => handleColorPick(c)}
                aria-label={`Assign ${c.id}`}
              />
            ))}
          </div>
          {assignments[activeCell] && (
            <button className="cipher-popup-clear" onClick={clearCell}>
              Clear
            </button>
          )}
        </div>
      )}

      {/* Encoded pairs — two rows of 5 */}
      <div className="cipher-pairs">
        <div className="cipher-pairs-row">
          {ENCODED_PAIRS.slice(0, 5).map((pair, i) => (
            <div key={i} className="cipher-pair">
              <span className="cipher-pair-dot" style={{ background: pair[0] }} />
              <span className="cipher-pair-dot" style={{ background: pair[1] }} />
            </div>
          ))}
        </div>
        <div className="cipher-pairs-row">
          {ENCODED_PAIRS.slice(5, 10).map((pair, i) => (
            <div key={i + 5} className="cipher-pair">
              <span className="cipher-pair-dot" style={{ background: pair[0] }} />
              <span className="cipher-pair-dot" style={{ background: pair[1] }} />
            </div>
          ))}
        </div>
      </div>

      <button className="cipher-clear-all" onClick={clearAll}>Clear All</button>
    </div>
  )
}
