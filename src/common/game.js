const emptyPlayer = {
  name: '',
}

const emptyGame = {
  p1: {
    name: 'p1',
  },
  p2: {
    name: 'p2',
  },
  p3: {
    name: 'p3',
  },
  p4: {
    name: 'p4',
  },
  dealer: 1,
}

const emptyPlay = {
  gameId: '',
  isSkip: false,
  isSolo: false,
  isWon: false,
  schneider: false,
  schwarz: false,
  lauf: 0,
  klopf: 0,
  players: [null, null, null, null],
  p1: {
    name: '',
  },
  p2: {
    name: '',
  },
  sauspielPrice: 0,
  soloPrice: 0,
  extraPrice: 0,
  price: 0,
}

function calculatePlayPrice(play) {
  const base = play.isSolo ? play.soloPrice : play.sauspielPrice
  const signum = play.isWon ? 1 : -1
  return (
    signum *
    Math.pow(2, play.klopf) *
    (base + play.extraPrice * (+play.schneider + +play.schwarz + play.lauf))
  )
}

function calculateEarningsForPlayer(player, plays) {
  let result = [0]
  let sum = 0

  plays.forEach((play) => {
    const isPlayer =
      play.p1?.name === player.name || play.p2?.name === player.name
    const soloFactor = play.isSolo && isPlayer ? 3 : 1
    const playerFactor = isPlayer ? 1 : -1

    sum += soloFactor * playerFactor * play.price
    result.push(sum)
  })
  return result
}
export {
  emptyPlayer,
  emptyGame,
  emptyPlay,
  calculatePlayPrice,
  calculateEarningsForPlayer,
}
