<h1 class="my-4">Schafkopftarif</h1>
<button type="button" class="btn btn-success my-4" on:click="{createGame}">Neue Runde</button>
<h2 class="my-4">Laufende Runden:</h2>
<ul class="list-group">
{#each sortedGames as game}
    <li class="list-group-item d-flex pointer" on:click="{() => openGame(game.id)}">
        <div class="col-11">
            {game.name} ({game.p1Name}, {game.p2Name}, {game.p3Name}, {game.p4Name})
        </div>
        <div class="col-1">
            <button class="btn btn-outline-danger" on:click|stopPropagation="{() => deleteGame(game.id)}">X</button>
        </div>
    </li>
{/each}
</ul>

<script>
    import {GAMES_KEY} from "../common/game"
    import router from "page"
    import { onMount } from "svelte"
    
    let games = []
    $: sortedGames = [...games].sort((a,b) => b - a)
    onMount(() => {
        try {
            games = JSON.parse(localStorage.getItem(GAMES_KEY)) || []
            games.reverse()
        } catch(e){
            console.error("Could not retrieve games", localStorage.getItem(ROUNDS_KEY))
        }
    })

    function deleteGame(id) {
        const toDelete = games.find(x => x.id === id);
        const isConfirmed = window.confirm(`Willst du die Runde wirklich Runde ${toDelete.name} löschen?`);
        if(isConfirmed){
            // Remove game
            games.splice(games.indexOf(toDelete), 1)
            // Tell svelte to update
            games = games

            // Persist back to localstorage
            localStorage.setItem(GAMES_KEY, JSON.stringify(games))
        }
    }

    function createGame() {
       router("/game")
    }
    
    function openGame(id) {
        router(`/game/${id}`)
    }

</script>