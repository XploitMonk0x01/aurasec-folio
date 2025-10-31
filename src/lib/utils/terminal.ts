// Deterministic PRNG for simulated outputs
export function seededRandom(seedStr: string) {
  let seed = 0
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0
  }
  return function () {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    return (seed >>> 0) / 4294967296
  }
}

// Format timestamp for terminal output
export function formatTerminalTimestamp() {
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const time = now.toTimeString().split(' ')[0]
  return `${date} ${time}`
}

// Storage helper for terminal history
export const terminalHistory = {
  get: () => {
    if (typeof window === 'undefined') return []
    const hist = localStorage.getItem('aurasec:term:hist')
    return hist ? JSON.parse(hist) : []
  },
  add: (command: string) => {
    if (typeof window === 'undefined') return
    const hist = terminalHistory.get()
    hist.push(command)
    if (hist.length > 200) hist.shift()
    localStorage.setItem('aurasec:term:hist', JSON.stringify(hist))
  },
}
