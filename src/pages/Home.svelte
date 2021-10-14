
<h1 class="my-4">Schafkopftarif</h1>
<button type="button" class="btn btn-success my-4" on:click="{createRound}">Neue Runde</button>
<h2 class="my-4">Laufende Runden:</h2>
<ul class="list-group">
{#each rounds as round}
    <li class="list-group-item pointer" on:click="{() => openRound(round.id)}">{round.name}</li>
{/each}
</ul>

<script>
    import router from "page"

    let rounds = [
        {id: 1, name: "Sauspielfreunde"},
        {id: 2, name: "Haddes Beste"},
        {id: 3, name: "Simons Struggles"},
        {id: 4, name: "Tom-Hadde-Wal-Ruben"},
    ]

    function createRound() {
       router("/round")
    }
    
    function openRound(id) {
        router(`/round/${id}`)
    }

</script>