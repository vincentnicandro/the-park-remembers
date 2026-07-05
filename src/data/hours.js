// The four founding embers — still-glowing splinters of Disneyland's real
// 1955 opening-day dedication, one resting in each original OUTER land.
// Main Street, U.S.A. holds no ember of its own: it's where the player is
// recruited at the start and where all four are assembled in the finale.
//
// An ember is not an object the player "collects" — solving a clue is the act
// of standing in the right spot and looking closely enough that the ember
// stirs. The reveal text isn't narration ABOUT the ember; it's what the ember
// says, a feeling finally given words again after seventy-odd years.
//
// Each ember is a self-contained puzzle:
//   title    — the ember's name on the collection screen ("The Past", etc.)
//   land     — where it rests
//   clue     — the words that send the player toward a place (no GPS; the
//              solving happens in the real environment)
//   gate     — the observation only answerable by standing there
//   accept   — accepted answers, matched case-insensitively after trimming
//   hint     — a single escalating nudge, offered at the cost of a "compromise"
//   ember    — what the ember remembers, revealed after a correct answer
//
// Every ember hides the same thread: light. Lamps, torches, beacons, stars.
// It's never named as the theme until the finale — but it's always there.
//
// Gate answers below are prototype placeholders keyed to the cipher designs in
// the treatment (TORCH / BEACON / LANTERN / SMALLWORLD) — confirm against the
// real in-park objects before shipping.

export const EMBERS = [
  {
    id: 'frontierland',
    land: 'Frontierland',
    title: 'The Past',
    dedication:
      'Frontierland is dedicated to the faith, courage, and ingenuity of our hearty pioneers who blazed the trails and made this progress possible.',
    clue:
      "The past isn't behind you here. It's carved into a plaque so ordinary most people walk right past it — measurements, geology, a gift note from one anniversary decades gone. Somewhere inside all those careful, boring facts, if you count closely enough, something else is spelled out. Some memories don't announce themselves. They wait in a paragraph everyone else skims.",
    gate:
      "Read the old claim-marker's notation against the plaque, line by line, and count out its letters. What single word do they spell?",
    accept: ['torch', 'a torch'],
    hint:
      'Each mark is three numbers — a line, then a word within that line, then a letter within that word. Read them in the order given and the word lights up on its own.',
    ember:
      'Before this was a place, it was a story someone told about people who went first — into land no one had mapped, on the strength of nothing but faith and rope and a lantern held out ahead of them. They never carried the whole fire. Just enough of it to see the next step, and the nerve to take it. That is all the past has ever asked of you: keep enough lit to find the next foothold, and go.',
  },
  {
    id: 'tomorrowland',
    land: 'Tomorrowland',
    title: 'The Future',
    dedication:
      'A vista into a world of wondrous ideas, signifying man\'s achievement, a step into the future... and the hope for a peaceful and unified world.',
    clue:
      "Somewhere in this land, someone once looked at a wall that didn't exist yet and described exactly what should be built against it — lit the way they imagined it would look at night, decades before the wiring existed to prove them right. The future is never actually empty. It's already full of plans nobody's finished wiring yet, and every guest who walks through is standing, for a moment, inside someone else's unfinished idea of what comes next.",
    gate:
      'What word does the future leave burning — set high and left on, not for the one who lit it, but so whoever comes after can find the way in?',
    accept: ['beacon', 'a beacon'],
    hint:
      "It isn't a light for the one who lights it. It's aimed outward, for whoever's still out in the dark, looking for the way in.",
    ember:
      "The trick of tomorrow is that it never arrives — it just keeps being unfinished, on purpose, so there's always room for the next person to add something to it. Someone lit a light here for a night they wouldn't live to see, and aimed it outward. Not to arrive first. To make sure the ones coming after had something to steer by.",
  },
  {
    id: 'adventureland',
    land: 'Adventureland',
    title: 'The Mystery',
    dedication:
      'Adventureland is dedicated to the wonder of adventure — the uncharted paths and distant lands that call to those who dare.',
    clue:
      "There are eyes in this land that were never meant to be found — and that's not a flaw in the design, that's the entire design. Some places are built to be understood. This one was built to be wondered about: a river that flows past the edge of the map, a flame left burning at a bend nobody explains. The carved gods along the path each keep a name; count into them the right way and they hand you a single word.",
    gate:
      "Read the carved gods in order, counting to the letter each one is owed. What single thing do their names spell — the thing you'd carry to walk toward a far-off flame?",
    accept: ['lantern', 'a lantern'],
    hint:
      "Match each icon to the god whose statue actually bears it — some in the set are decoys — then count to the numbered letter in that god's name. In order, they spell what you carry.",
    ember:
      "Mystery isn't the absence of light. It's a single flame placed just far enough away that you have to choose to walk toward it. This land kept one burning at a bend in the path and never explained why — because the wondering is the point, and a thing fully explained stops glowing the moment you're done with it.",
  },
  {
    id: 'fantasyland',
    land: 'Fantasyland',
    title: 'The Dream',
    dedication:
      'Fantasyland is dedicated to the young and the young in heart, to those who believe that when you wish upon a star, your dreams do come true.',
    clue:
      "Follow the light where the pachyderms fly,\nsixteen of them first wheeling low and then high.\n\nTrade each elephant's number for its shade,\nand lay those colors on the grid has made.\n\nRead every pair where the row meets the line,\nand the wish that they spell is your next sign.",
    gate: '',
    accept: [
      'smallworld',
      'small world',
      'a small world',
      'its a small world',
      'it is a small world',
      'it’s a small world',
    ],
    hint:
      "Each color-pair is a row color and a column color; find where they cross on the grid for one letter. Ten colors, five pairs — the letters that repeat are your check that you're reading it right.",
    ember:
      'A wish only works if something on the other end is listening. Somebody, a long time ago, decided a star was as good a place as any to send one — a light so far off nobody could prove it was still burning, and everyone sent their wish to it anyway. Whether it was still lit never mattered as much as the fact that people kept aiming their hope at it, together, in the dark. That is the smallest, oldest world there is: the one that lights up the instant someone believes in it.',
  },
]

// The frame shown the moment a player arrives at a land, before the clue is solved.
export function arrivalText(land) {
  return `Something's still glowing here, faint enough that most people walk right past it. ${land} hasn't forgotten — it's just waiting for someone to look the right way.`
}

export const EMBER_BY_ID = Object.fromEntries(EMBERS.map((e) => [e.id, e]))
export const TOTAL_EMBERS = EMBERS.length

export function normalizeAnswer(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[.,!?'"’]/g, '')
    .replace(/\s+/g, ' ')
}

export function isCorrect(ember, input) {
  const n = normalizeAnswer(input)
  return ember.accept.some((a) => normalizeAnswer(a) === n)
}
