<script>
  import { emptyPlay, emptyGame, calculatePlayBasePrice } from '../common/game'
  import {
    createPlayDocument,
    fetchGameDocumentRealtime,
    unsubscribe,
    updateGameDocument,
  } from '../common/db'
  import { onMount, onDestroy } from 'svelte'
  import router from 'page'

  export let params

  let game = emptyGame
  let play = emptyPlay
  $: price = calculatePlayBasePrice(play)
  $: players = [undefined, game.p1, game.p2, game.p3, game.p4]
  $: jungfrauCount = play.players.filter((p) => p && p.isJungfrau).length

  onMount(() => {
    fetchGameDocumentRealtime(params.id, (gameData) => {
      game = gameData
      play = {
        ...emptyPlay,
        type: 'SAU',
        gameId: game.id,
        p1: game.p1,
        p2: game.p2,
        players: [game.p1, game.p2, game.p3, game.p4],
        sauspielPrice: game.sauspiel,
        soloPrice: game.solo,
        extraPrice: game.extra,
      }
    })
  })
  onDestroy(() => unsubscribe())

  function setType(type) {
    play.type = type

    if (play.type === 'SAU') {
      play.p2 = game.p2
    } else {
      play.p2 = null
    }
    if (play.type === 'RAMSCH') {
      play.isWon = false
      play.schneider = false
      play.schwarz = false
      play.multiplier = 0
      play.lauf = 0
    }
    play.players.forEach((x) => delete x.isJungfrau)
  }

  function togglePlayer(i) {
    const player = players[i]

    //toggle same player button
    if (play.p1 === player) {
      play.p1 = null
      return
    }
    if (play.p2 === player) {
      play.p2 = null
      return
    }

    if (play.type === 'SOLO' || play.type === 'RAMSCH') {
      // solo/ramsch player is alone
      play.p1 = player
      play.p2 = null
    } else {
      if (!play.p1) {
        play.p1 = player
        return
      }
      if (!play.p2) {
        play.p2 = player
        return
      }
      // Two players are already set, select a new one
      play.p1 = player
      play.p2 = null
    }
    play.players.forEach((x) => (x.isJungfrau = false))
  }
  function toggleSchneider() {
    play.schneider = !play.schneider
    if (!play.schneider) {
      play.schwarz = false
    }
  }

  function toggleSchwarz() {
    play.schwarz = !play.schwarz
    if (play.schwarz) {
      play.schneider = true
    }
  }

  async function recordPlay() {
    // Check if required player count is correct
    const isSolo = play.type === 'SOLO' || play.type === 'RAMSCH'
    if (isSolo && ((play.p1 && play.p2) || (!play.p1 && !play.p2))) {
      alert('Ein Spieler beim Solo!')
      return false
    }
    if (!isSolo && !(play.p1 && play.p2)) {
      alert('Zwei Spieler beim Sauspiel!')
      return false
    }

    // record game
    play.price = price
    await createPlayDocument(play)

    // Set dealer to next player
    game.dealer = (game.dealer % 4) + 1
    await updateGameDocument(game.id, { dealer: game.dealer })

    router(`/game/${params.id}`)
  }
</script>

<form on:submit|preventDefault={recordPlay}>
  <div class="container text-start my-1">
    <div class="row justify-content-center px-2">
      <div class="col col-sm-5 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="sauspiel"
          autocomplete="off"
          checked={play.type === 'SAU'}
          on:click|preventDefault={(_) => setType('SAU')} />
        <label
          class="btn btn-lg btn-outline-success shadow-none"
          for="sauspiel"
          on:click|preventDefault={(_) => setType('SAU')}>Sauspiel</label>
      </div>
      <div class="col col-sm-5 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="solo"
          autocomplete="off"
          checked={play.type === 'SOLO'}
          on:click|preventDefault={(_) => setType('SOLO')} />
        <label
          class="btn btn-lg btn-outline-danger shadow-none"
          for="solo"
          on:click|preventDefault={(_) => setType('SOLO')}>Solo</label>
      </div>
      <div class="col col-sm-2 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="ramsch"
          autocomplete="off"
          checked={play.type === 'RAMSCH'}
          on:click|preventDefault={(_) => setType('RAMSCH')} />
        <label
          class="btn btn-lg btn-outline-secondary shadow-none"
          for="solo"
          on:click|preventDefault={(_) => setType('RAMSCH')}>Ramsch</label>
      </div>
    </div>

    <h2 class="mt-4">
      {play.type !== 'RAMSCH' ? 'Spieler' : 'Verlierer'}:
    </h2>
    <div class="row justify-content-center my-3 px-2">
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p1"
          autocomplete="off"
          checked={play.p1 === players[1] || play.p2 === players[1]}
          on:click|preventDefault={() => togglePlayer(1)} />
        <label
          class="btn btn-lg btn-outline-primary shadow-none"
          for="p1"
          on:click|preventDefault={() => togglePlayer(1)}>{game.p1.name}</label>
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p2"
          autocomplete="off"
          checked={play.p1 === players[2] || play.p2 === players[2]}
          on:click|preventDefault={() => togglePlayer(2)} />
        <label
          class="btn btn-lg btn-outline-secondary shadow-none"
          for="p2"
          on:click|preventDefault={() => togglePlayer(2)}>{game.p2.name}</label>
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p3"
          autocomplete="off"
          checked={play.p1 === players[3] || play.p2 === players[3]}
          on:click|preventDefault={() => togglePlayer(3)} />
        <label
          class="btn btn-lg btn-outline-info shadow-none"
          for="p3"
          on:click|preventDefault={() => togglePlayer(3)}>{game.p3.name}</label>
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p4"
          autocomplete="off"
          checked={play.p1 === players[4] || play.p2 === players[4]}
          on:click|preventDefault={() => togglePlayer(4)} />
        <label
          class="btn btn-lg btn-outline-light shadow-none"
          for="p4"
          on:click|preventDefault={() => togglePlayer(4)}>{game.p4.name}</label>
      </div>
    </div>
    <hr />

    {#if play.type !== 'RAMSCH'}
      <div class="row justify-content-center">
        <div class="col-3 d-grid gap-2 p-0">
          <input
            type="checkbox"
            class="btn-check"
            id="isWon"
            autocomplete="off"
            disabled={play.type === 'RAMSCH'}
            bind:checked={play.isWon} />
          <label class="btn btn-lg btn-outline-success shadow-none" for="isWon"
            >Gewonnen?</label>
        </div>
      </div>
    {:else}
      <div class="row px-2">
        <div class="col align-self-center">
          <h3 class="align-middle">Jungfrau:</h3>
        </div>

        {#each play.players.filter((x) => x && x !== play.p1 && x !== play.p2) as p, index}
          <div class="col row justify-content-center">
            <input
              type="checkbox"
              class="btn-check"
              id={'j' + index}
              autocomplete="off"
              checked={play.players[index].isJungfrau}
              on:click|preventDefault={() =>
                (play.players[index].isJungfrau =
                  !play.players[index].isJungfrau)} />
            <label
              class="btn btn-lg btn-outline-secondary shadow-none"
              for={'j' + index}
              on:click|preventDefault={() =>
                (play.players[index].isJungfrau =
                  !play.players[index].isJungfrau)}>
              {p.name}
            </label>
          </div>
        {/each}
      </div>
    {/if}
    <hr />
    <div class="block-height">
      <h2>Extras:</h2>
      {#if play.type !== 'RAMSCH'}
        <div class="row justify-content-center px-2">
          <div class="col-6 d-grid gap-2 p-0">
            <input
              type="checkbox"
              class="btn-check"
              id="schneider"
              autocomplete="off"
              checked={play.schneider}
              on:click|preventDefault={toggleSchneider} />
            <label
              class="btn btn-lg btn-outline-warning shadow-none"
              for="schneider"
              on:click|preventDefault={toggleSchneider}>Schneider</label>
          </div>
          <div class="col-6 d-grid gap-2 p-0">
            <input
              type="checkbox"
              class="btn-check"
              id="schwarz"
              autocomplete="off"
              checked={play.schwarz}
              on:click|preventDefault={toggleSchwarz} />
            <label
              class="btn btn-lg btn-outline-danger shadow-none"
              for="schwarz"
              on:click|preventDefault={toggleSchwarz}>Schwarz</label>
          </div>
        </div>
        <div class="row justify-content-around align-items-center my-2">
          <div class="col-5 row justify-content-end align-items-center">
            Läufer: <button
              class="btn btn-dark col-3 ms-2"
              on:click|preventDefault={() =>
                (play.lauf = play.lauf > 0 ? play.lauf - 1 : play.lauf)}
              >-</button>
          </div>
          <div class="col-2 text-center fs-3 d-flex justify-content-center">
            <div class="circle">{play.lauf}</div>
          </div>
          <div class="col-5 row justify-content-start align-items-center">
            <button
              class="btn btn-dark col-3"
              on:click|preventDefault={() =>
                (play.lauf = play.lauf < 14 ? play.lauf + 1 : play.lauf)}
              >+</button>
          </div>
        </div>
      {/if}
      <div class="row justify-content-around align-items-center my-2">
        <div class="col-5 row justify-content-end align-items-center">
          Klopfer:
          <button
            class="btn btn-dark col-3 ms-2"
            on:click|preventDefault={() =>
              (play.multiplier =
                play.multiplier > 0 ? play.multiplier - 1 : play.multiplier)}>
            -
          </button>
        </div>
        <div class="col-2 text-center fs-3 d-flex justify-content-center">
          <div class="circle">{play.multiplier}</div>
        </div>
        <div class="col-5 row justify-content-start align-items-center">
          <button
            class="btn btn-dark col-3"
            on:click|preventDefault={() =>
              (play.multiplier =
                play.multiplier < 6 ? play.multiplier + 1 : play.multiplier)}
            >+</button>
        </div>
      </div>
    </div>
    <hr />
  </div>
  <h2>
    Preis:
    {play.type === 'SOLO' || play.type === 'RAMSCH'
      ? 3 + jungfrauCount + ' x'
      : ''}
    {price} Punkte {play.type === 'SOLO' ? `(${3 * price} P)` : ''}
  </h2>
  <hr />
  <button type="submit" class="btn btn-lg btn-success">Spiel eintragen</button>
</form>

<style>
  .circle {
    border: 2px solid #fff;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.2rem;
  }
  .block-height {
    height: 11em
  }

</style>
