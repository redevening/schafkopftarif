<script>
  import { fetchPlayerDocumentsRealtime, createPlayerDocument, unsubscribe } from '../common/db'
  import { onMount, onDestroy } from 'svelte'
  import { stringToColor } from '../common/util'
  import router from 'page'
  import {emptyPlayer} from "../common/game"

  let players = []
  let newPlayer = {...emptyPlayer}

  onMount(() => {
    fetchPlayerDocumentsRealtime((playersData) => (players = playersData))
  })
  onDestroy(() => unsubscribe())

  function openPlayer(player) {
    router(`/player/${player.id}`)
  }
  async function createPlayer() {
    if(!newPlayer.name) {
      window.alert("Spielername ist leer!")
      return
    }
    await createPlayerDocument(newPlayer)
  }
</script>

<h1 class="my-4">Spieler</h1>

<div class="parent">
  {#each players as player}
    <div
      class="card m-2 pointer square"
      style="background-color: {stringToColor(
        player.name
      )}"
      on:click={() => openPlayer(player)}>
      <img
        src="https://avatars.dicebear.com/api/adventurer/{player.name}-image.svg"
        alt="avatar" />
      <div class="card-body">
        <p class="card-text fw-bold">
          {player.name}
        </p>
      </div>
    </div>
  {/each}

  <div class="card m-2 d-flex pointer two-cols">
    <form on:submit|preventDefault={createPlayer}>
      <div class="form-group m-2">
        <div class="form-floating">
          <input
            class="form-control"
            id="name"
            bind:value={newPlayer.name}
            required />
          <label for="name">Name</label>
        </div>
        <hr>
        <button type="submit" class="btn btn-lg btn-outline-success"
        >neuer Spieler</button>
      </div>
    </form>
  </div>
</div>

<style>
  .parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .two-cols {
    grid-column: span 2;
  }
</style>
