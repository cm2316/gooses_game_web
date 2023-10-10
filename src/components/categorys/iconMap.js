export const imap = {
  action: 'tag-action',
  adventure: 'tag-adventure',
  arcade: 'tag-arcade',
  board: 'tag-board',
  card: 'tag-card',
  casino: 'tag-casino',
  casual: 'tag-casual',
  educational: 'tag-educational',
  music: 'tag-music',
  puzzle: 'tag-puzzle',
  racing: 'tag-racing',
  roleplaying: 'tag-rolePlaying',
  simulation: 'tag-simulation',
  sports: 'tag-sports',
  strategy: 'tag-strategy',
  trivia: 'tag-trivia',
  word: 'tag-word',
  games: 'tag-games',
  apps: 'tag-apps',
}

export default new Proxy(imap, {
  get(target, key) {
    const _key = key.toString().toLowerCase().replace(/\s+/g, '_')
    return target[_key]
  },
})
