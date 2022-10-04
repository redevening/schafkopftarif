import {
  calculateEarningsForPlayer,
  calculatePlayBasePrice,
  emptyPlay,
} from './game'

const SAU_PRICE = 20
const SOLO_PRICE = 50
const EXTRA_PRICE = 10

describe('', () => {
  let play
  beforeEach(() => {
    play = {
      ...emptyPlay,
      sauspielPrice: SAU_PRICE,
      soloPrice: SOLO_PRICE,
      extraPrice: EXTRA_PRICE,
    }
  })

  describe('base price', () => {
    test('of won SAU should be sauspielPrice', () => {
      play.type = 'SAU'
      play.isWon = true

      const basePrice = calculatePlayBasePrice(play)

      expect(basePrice).toBe(SAU_PRICE)
    })
    test('of lost SOLO should be soloPrice', () => {
      play.type = 'SOLO'
      play.isWon = false

      const basePrice = calculatePlayBasePrice(play)

      expect(basePrice).toBe(-SOLO_PRICE)
    })
    test('of RAMSCH is negative soloPrice', () => {
      play.type = 'SOLO'
      play.isWon = false

      const basePrice = calculatePlayBasePrice(play)

      expect(basePrice).toBe(-SOLO_PRICE)
    })
    test('of SKIP is ZERO', () => {
      play.type = 'SKIP'
      play.lauf = 3
      play.isWon = false

      const basePrice = calculatePlayBasePrice(play)

      expect(basePrice).toBe(0)
    })
    test('of 2 klopf 3 lauf schneider schwarz SOLO is 400', () => {
      play.type = 'SOLO'
      play.lauf = 3
      play.isWon = true
      play.multiplier = 2
      play.schneider = true
      play.schwarz = true

      const basePrice = calculatePlayBasePrice(play)

      expect(basePrice).toBe(400)
    })
  })
  describe('player earnings', () => {
    // test multiple plays played after each other
    const playerA = { name: 'A' }
    const playerB = { name: 'B' }
    const playerC = { name: 'C' }
    const playerD = { name: 'D' }
    let plays = []

    test('should be 0 for no games', () => {
      expect(calculateEarningsForPlayer(playerA, plays)).toEqual([0])
      expect(calculateEarningsForPlayer(playerB, plays)).toEqual([0])
      expect(calculateEarningsForPlayer(playerC, plays)).toEqual([0])
      expect(calculateEarningsForPlayer(playerD, plays)).toEqual([0])
    })

    // First game is skipped
    test('should be 0 for skipped game', () => {
      plays.push({
        ...play,
        type: 'SKIP',
        players: [playerA, playerB, playerC, playerD],
      })
      expect(calculateEarningsForPlayer(playerA, plays)).toEqual([0, 0])
      expect(calculateEarningsForPlayer(playerB, plays)).toEqual([0, 0])
      expect(calculateEarningsForPlayer(playerC, plays)).toEqual([0, 0])
      expect(calculateEarningsForPlayer(playerD, plays)).toEqual([0, 0])
    })

    // Second game Player A and B win Sauspiel with 2 lauf
    test('should be correct for Sauspiel', () => {
      plays.push({
        ...play,
        p1: playerA,
        p2: playerB,
        players: [playerA, playerB, playerC, playerD],
        type: 'SAU',
        isWon: true,
        lauf: 2,
        price: 0, //todo calc base price
      })
      console.log(plays)
      //const earnings = calculateEarningsForPlayer(playerA, plays)
      //expect(earnings).toEqual([0,0,20])
    })
  })
})
