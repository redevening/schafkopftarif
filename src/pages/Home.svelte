<script>
  import router from 'page'
  import { onMount, onDestroy } from 'svelte'
  import {
    deleteGameDocument,
    fetchGameDocumentsRealtime,
    unsubscribe,
  } from '../common/db'

  let games = []
  $: sortedGames = [...games].sort((a, b) => b.created - a.created)

  onMount(() => {
    fetchGameDocumentsRealtime((gamesData) => (games = gamesData))
  })
  onDestroy(() => unsubscribe())

  async function removeGame(id) {
    const toDelete = games.find((x) => x.id === id)
    const isConfirmed = window.confirm(
      `Willst du die Runde wirklich Runde ${toDelete.name} löschen?`
    )
    if (isConfirmed) {
      await deleteGameDocument(id)
    }
  }

  function createGame() {
    router('/game')
  }

  function openGame(id) {
    router(`/game/${id}`)
  }
</script>

<h1 class="my-4">Schafkopftarif</h1>
<button type="button" class="btn btn-success my-4" on:click={createGame}
  >Neue Runde</button>
<h2 class="my-4">Laufende Runden:</h2>
<ul class="list-group">
  {#each sortedGames as game}
    <li
      class="list-group-item d-flex pointer"
      on:click={() => openGame(game.id)}>
      <div class="col-11">
        {game.name} ({game.p1.name}, {game.p2.name}, {game.p3.name}, {game.p4
          .name})
      </div>
      <div class="col-1">
        <button
          class="btn btn-outline-danger"
          on:click|stopPropagation={() => removeGame(game.id)}>X</button>
      </div>
    </li>
  {/each}
</ul>
