<h1 class="my-4">Schafkopftarif</h1>
<button type="button" class="btn btn-success my-4" on:click="{createGame}">Neue Runde</button>
<h2 class="my-4">Laufende Runden:</h2>
<ul class="list-group">
{#each games as game}
    <li class="list-group-item pointer" on:click="{() => openGame(game.id)}">{game.name} ({game.p1Name}, {game.p2Name}, {game.p3Name}, {game.p4Name})</li>
{/each}
</ul>

<script>
    import {GAMES_KEY} from "../common/game"
    import router from "page"
    import { onMount } from "svelte"
    
    let games = []
    onMount(() => {
        try {
            games = JSON.parse(localStorage.getItem(GAMES_KEY)) || []
            games.reverse()
            console.log(games)
        } catch(e){
            console.error("Could not retrieve games", localStorage.getItem(ROUNDS_KEY))
        }
    })

    function createGame() {
       router("/game")
    }
    
    function openGame(id) {
        router(`/game/${id}`)
    }

</script>