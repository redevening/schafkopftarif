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
  type: 'SKIP', // SKIP, SAU, SOLO, RAMSCH
  isWon: false,
  schneider: false,
  schwarz: false,
  lauf: 0,
  multiplier: 0,
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

/**
 * Calculates the "base" price of a play.
 * This amount does not represent the full money that is payed from the loosers
 * to the winners.
 *
 * For Sauspiel it is the price a loosing player pays the winner.
 *
 * For Solo it is the price a loosing play pays the winner.
 *   The amount the winner gets is three times returned number as the solo
 *   player gets his money from the three loosing players.
 *
 * For Ramsch it is the price a non Jungfrau player gets from the looser.
 *   The full amount the looser has to pay would be (three + number_of_jungfrau)
 *   times the calculated price. A Jungfrau player gets double the returned amount.
 *
 * For a Skip zero is returned.
 */
function calculatePlayPrice(play) {
  let base
  let signum = play.isWon ? 1 : -1
  switch (play.type) {
    case 'SKIP':
      base = 0
      break
    case 'SAU':
      base = play.sauspielPrice
      break
    case 'RAMSCH':
      base = play.sauspielPrice
      signum = -1
      break
    case 'SOLO':
      base = play.soloPrice
  }
  return (
    signum *
    Math.pow(2, play.multiplier) *
    (base + play.extraPrice * (+play.schneider + +play.schwarz + play.lauf))
  )
}

/**
 * Calculates the aggregated earnings for the player.
 *
 * @returns An array [0, earnings_after_first_game, earnings_after_second_game, ...]
 */
function calculateEarningsForPlayer(player, plays) {
  let result = [0]
  let sum = 0

  plays.forEach((play) => {
    const isPlayer =
      play.p1?.name === player.name || play.p2?.name === player.name
    const soloFactor =
      play.type === 'SOLO' || (play.type === 'RAMSCH' && isPlayer) ? 3 : 1
    const playerFactor = isPlayer ? 1 : -1
    let jungfrauFactor = play.type === 'RAMSCH' && player.isJungfrau ? 2 : 1

    sum += soloFactor * playerFactor * jungfrauFactor * play.price
    result.push(sum)
  })
  return result
}

export { emptyGame, emptyPlay, calculatePlayPrice, calculateEarningsForPlayer }
