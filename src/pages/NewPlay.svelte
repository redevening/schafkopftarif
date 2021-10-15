<form on:submit|preventDefault="{recordPlay}">
    <div class="container text-start my-1">
        <div class="row justify-content-center px-2">
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="sauspiel" autocomplete="off" checked={!isSolo} on:click|preventDefault={toggleIsSolo}>
                <label class="btn btn-lg btn-outline-success shadow-none" for="sauspiel" on:click|preventDefault={toggleIsSolo}>Sauspiel</label>
            </div>
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="solo" autocomplete="off" checked={isSolo} on:click|preventDefault={toggleIsSolo}>
                <label class="btn btn-lg btn-outline-danger shadow-none" for="solo" on:click|preventDefault={toggleIsSolo}>Solo</label>
            </div>
        </div>

        <h2 class="mt-4">Spieler:</h2>
        <div class="row justify-content-center my-3 px-2">
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p1" autocomplete="off" checked={p1 === 1 || p2 === 1} on:click|preventDefault={() => togglePlayer(1)} >
                <label class="btn btn-lg btn-outline-primary shadow-none" for="p1" on:click|preventDefault={() => togglePlayer(1)}>{game.p1Name}</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p2" autocomplete="off" checked={p1 === 2 || p2 === 2} on:click|preventDefault={() => togglePlayer(2)}>
                <label class="btn btn-lg btn-outline-secondary shadow-none" for="p2" on:click|preventDefault={() => togglePlayer(2)}>{game.p2Name}</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p3" autocomplete="off" checked={p1 === 3 || p2 === 3} on:click|preventDefault={() => togglePlayer(3)}>
                <label class="btn btn-lg btn-outline-info shadow-none" for="p3" on:click|preventDefault={() => togglePlayer(3)}>{game.p3Name}</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p4" autocomplete="off"  checked={p1 === 4 || p2 === 4} on:click|preventDefault={() => togglePlayer(4)}>
                <label class="btn btn-lg btn-outline-light shadow-none" for="p4" on:click|preventDefault={() => togglePlayer(4)}>{game.p4Name}</label>
            </div>
        </div>
        <hr>
        
        <div class="row justify-content-center">
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="isWon" autocomplete="off" bind:checked={isWon}>
                <label class="btn btn-lg btn-outline-success shadow-none fs-1" for="isWon">Gewonnen?</label>
            </div>
        </div>
        <hr>

        <h2>Extras:</h2>

        <div class="row justify-content-center px-2">
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="schneider" autocomplete="off" checked={schneider} on:click|preventDefault={toggleSchneider}>
                <label class="btn btn-lg btn-outline-warning shadow-none" for="schneider" on:click|preventDefault={toggleSchneider}>Schneider</label>
            </div>
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="schwarz" autocomplete="off" checked={schwarz} on:click|preventDefault={toggleSchwarz}>
                <label class="btn btn-lg btn-outline-danger shadow-none" for="schwarz" on:click|preventDefault={toggleSchwarz}>Schwarz</label>
            </div>
        </div>

        <div class="row justify-content-around align-items-center my-2">
            <div class="col-5 row justify-content-end align-items-center">
                Läufer: <button class="btn btn-dark col-3 ms-2" on:click|preventDefault={() => lauf = lauf > 0 ? lauf-1 : lauf}>-</button>
            </div>
            <div class="col-2 text-center fs-3">
                <div class="circle">{lauf}</div>
            </div>
            <div class="col-5 row justify-content-start align-items-center">
                <button class="btn btn-dark col-3" on:click|preventDefault={() => lauf = lauf < 14 ? lauf+1 : lauf}>+</button>
            </div>
        </div>

        <div class="row justify-content-around align-items-center my-2">
            <div class="col-5 row justify-content-end align-items-center">
                Klopfer: <button class="btn btn-dark col-3 ms-2" on:click|preventDefault={() => klopf = klopf > 0 ? klopf-1 : klopf}>-</button>
            </div>
            <div class="col-2 text-center fs-3">
                <div class="circle">{klopf}</div>
            </div>
            <div class="col-5 row justify-content-start align-items-center">
                <button class="btn btn-dark col-3" on:click|preventDefault={() => klopf = klopf < 6 ? klopf+1 : klopf}>+</button>
            </div>
        </div>
    </div>
    <hr>
    <h2>Preis: {isSolo ? "3 x" : ""} {play.price} Punkte {isSolo ? `(${3*play.price} P)` : ""}</h2>
    <hr>
    <button type="submit" class="btn btn-lg btn-success">Spiel eintragen</button>
</form>

<style>
    .circle {
        border: 2px solid #fff;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.2rem
    }
</style>

<script>
    import { Play, Game, GAMES_KEY } from "../common/game"
    import { onMount } from "svelte"
    import router from "page"

    export let params

    let isSolo = false, p1, p2, isWon = false, schneider = false, schwarz = false, lauf = 0, klopf = 0
    let game = new Game(), allGames
    $: multiplicator = Math.pow(2, klopf)
    $: play = new Play(isSolo, p1, p2, isWon, schneider, schwarz, lauf, multiplicator, 20, 50, 10)

    onMount(() => {
        try {
            allGames = JSON.parse(localStorage.getItem(GAMES_KEY)) || []
            game = allGames[params.id]
        } catch(e){
            console.error("Could not retrieve game", localStorage.getItem(GAMES_KEY))
        }
    })

    function toggleIsSolo() {
        isSolo = !isSolo
        if(isSolo) {
            p2 = undefined
        }
    }

    function togglePlayer(i) {
        //toggle same player button
        if(p1 === i) {
            p1 = undefined
            return
        }
        if(p2 === i) {
            p2 = undefined
            return
        }

        if(isSolo) {
            // solo player is alone
            p1 = i
            p2 = undefined
        } else {
            if(!p1) {
                p1 = i
                return
            }
            if(!p2) {
                p2 = i
                return
            }
            // Two players are already set, select a new one
            p1 = i
            p2 = undefined
        }
    }
    function toggleSchneider() {
        schneider = !schneider
        if(!schneider) {
            schwarz = false
        }
    }

    function toggleSchwarz() {
        schwarz = !schwarz
        if(schwarz) {
            schneider = true
        }
    }

    function recordPlay() {
        // Check if required player count is correct
        if(isSolo && (p1 && p2 || !p1 && !p2)) {
            alert("Ein Spieler beim Solo!")
            return false
        }
        if(!isSolo && !(p1 && p2)) {
            alert("Zwei Spieler beim Sauspiel!")
            return false
        }
        // Set dealer to next player
        game.dealer = (game.dealer % 4) + 1

        // record game
        game.plays.push(play)
        allGames[params.id] = game
        localStorage.setItem(GAMES_KEY, JSON.stringify(allGames))
        router(`/game/${params.id}`)
    }
</script>