<h1 class="my-4">{game.name}</h1>

<div class="container text-start text-nowrap lead">
    <h2>Spieler:</h2>

    <div class="row justify-content-between">
        <div class="col">
            <span>- {game.p1Name}:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">{p1Earnings}</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- {game.p2Name}:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">{p2Earnings}</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- {game.p3Name}:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">{p3Earnings}</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- {game.p4Name}:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">{p4Earnings}</span> Punkte
        </div>
    </div>


    <h2 class="text-start mt-4">Geber:</h2>
    <div class="ms-3 lead">
        {game[`p${game.dealer}Name`]}
    </div>
    <div class="row justify-content-center">
        <div class="col-6 d-grid gap-2">
            <button type="button" class="btn btn-lg btn-success my-2" on:click="{newPlay}">Spiel eintragen</button>
        </div>
    </div>
    <hr>

    <h2>Spiele:</h2>

    {#each orderedPlays as play}
    <div class="row justify-content-between text-center fs-6 px-1">
        <div class="col-3 border">
            {play.isSolo ? "Solo" : "Sauspiel"}
        </div>
        <div class="col-4 border">
            {game[`p${play.p1}Name`]} {!play.isSolo ? "+" : ""} {game[`p${play.p2}Name`] ? game[`p${play.p2}Name`] : ""}
        </div>
        <div class="col-5 border">
            <span class="monospace">{play.price > 0 ? "+" : "-"} {Math.abs(play.price).toString().padStart(4, "\u00A0")}</span> P
        </div>
    </div>
    {/each}
</div>

<script>
    import router from "page"
    import {onMount} from "svelte"
    import {GAMES_KEY, Game, Play} from "../common/game"

    export let params

    let game = new Game()
    $: orderedPlays = game.plays.slice().reverse()
    $: p1Earnings = formatEarnings(game, 1)
    $: p2Earnings = formatEarnings(game, 2)
    $: p3Earnings = formatEarnings(game, 3)
    $: p4Earnings = formatEarnings(game, 4)

    onMount(() => {
        let g
        try {
            const games = JSON.parse(localStorage.getItem(GAMES_KEY)) || []
            g = games[params.id]
        } catch(e){
            console.error("Could not retrieve game", localStorage.getItem(GAMES_KEY))
        }

        // Build Game Object from dumb JSON
        game = new Game(g.id, g.name, g.p1Name, g.p2Name, g.p3Name, g.p4Name, g.sauspiel, g.solo, g.extra, g.dealer)
        game.plays = g.plays
            .map(p => new Play(p.isSolo, p.p1, p.p2, p.isWon,
                p.schneider, p.schwarz, p.lauf, p.multiplicator,
                p.sauspielPrice, p.soloPrice, p.extraPrice ))
    })

    function formatEarnings(g, i) {
        const earnings = g.calculateEarnings(i)
        const sign = earnings > 0 ? "+" : "-" 
        const padded = ("" + Math.abs(earnings)).padStart(5, "\u00A0")
        return `${sign} ${padded}`
    }

    function newPlay() {
        router(`/game/${params.id}/play`)
    }
    
</script>