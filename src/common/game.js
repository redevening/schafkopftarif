const GAMES_KEY = "GAMES";

const Game = class Games {
    constructor(id = -1, name = "", p1Name = "", p2Name = "", p3Name = "", p4Name = "", sauspiel = 0, solo = 0, extra = 0,  dealer = 1) {
        this.id = id
        this.name = name
        this.p1Name = p1Name
        this.p2Name = p2Name
        this.p3Name = p3Name
        this.p4Name = p4Name
        this.sauspiel = sauspiel
        this.solo = solo
        this.extra = extra
        this.dealer = dealer
        this.plays = []
    }

    calculateEarnings(pI) {
        return this.plays
            .map(play => {
                const isPlayer = play.p1 === pI || play.p2 === pI
                const soloFactor = play.isSolo && isPlayer ? 3 : 1
                const playerFactor = isPlayer ? 1 : -1

                return soloFactor * playerFactor * play.price
            })
            .reduce((prev, cur) => prev + cur, 0)
    }
}

const Play = class Play {
    constructor(isSolo = false, p1 = undefined, p2 = undefined, isWon = false, schneider = false, schwarz = false, lauf = 0, multiplicator = 1, sauspielPrice = 0, soloPrice = 0, extraPrice = 0){
        this.isSolo = isSolo
        this.p1 = p1
        this.p2 = p2
        this.isWon = isWon
        this.schneider = schneider
        this.schwarz = schwarz
        this.lauf = lauf
        this.multiplicator = multiplicator

        this.sauspielPrice = sauspielPrice
        this.soloPrice = soloPrice
        this.extraPrice = extraPrice
    }

    get price() {
        const base = this.isSolo ? this.soloPrice : this.sauspielPrice
        const signum = this.isWon ? 1 : -1;
        return signum * this.multiplicator * (base + this.extraPrice * (+this.schneider + +this.schwarz + this.lauf))
    }    
}



export {GAMES_KEY, Game, Play}