<script>
  import router from 'page'
  import { onMount, onDestroy } from 'svelte'
  import {
    emptyGame,
    emptyPlay,
    calculateEarningsForPlayer,
  } from '../common/game'
  import {
    fetchGameDocumentRealtime,
    fetchPlayDocumentsRealtime,
    unsubscribe,
    createPlayDocument,
    deletePlayDocument,
    updateGameDocument,
  } from '../common/db'
  import Chart from '../components/Chart.svelte'

  export let params

  let game = emptyGame
  let plays = []
  $: descOrderedPlays = [...plays].sort(
    (a, b) => (a === null) - (b === null) || b.created - a.created
  )
  $: ascOrderedPlays = [...plays].sort(
    (a, b) => (a === null) - (b === null) || a.created - b.created
  )

  $: p1Earnings = calculateEarningsForPlayer(game.p1, ascOrderedPlays)
  $: p2Earnings = calculateEarningsForPlayer(game.p2, ascOrderedPlays)
  $: p3Earnings = calculateEarningsForPlayer(game.p3, ascOrderedPlays)
  $: p4Earnings = calculateEarningsForPlayer(game.p4, ascOrderedPlays)

  $: p1EarningsStr = formatEarnings(p1Earnings[p1Earnings.length - 1])
  $: p2EarningsStr = formatEarnings(p2Earnings[p2Earnings.length - 1])
  $: p3EarningsStr = formatEarnings(p3Earnings[p3Earnings.length - 1])
  $: p4EarningsStr = formatEarnings(p4Earnings[p4Earnings.length - 1])
  $: dealerName = game[`p${game.dealer}`].name

  onMount(() => {
    fetchGameDocumentRealtime(params.id, (gameData) => (game = gameData))
    fetchPlayDocumentsRealtime(params.id, (playsData) => (plays = playsData))
  })
  onDestroy(() => unsubscribe())

  function formatEarnings(earnings) {
    const sign = earnings > 0 ? '+' : '-'
    const padded = ('' + Math.abs(earnings)).padStart(5, '\u00A0')
    return `${sign} ${padded}`
  }

  async function skipPlay() {
    // Create skip game
    const skip = {
      ...emptyPlay,
      gameId: params.id,
      isSkip: true,
    }
    await createPlayDocument(skip)

    // Set dealer to next player
    const dealer = (game.dealer % 4) + 1
    await updateGameDocument(game.id, { dealer: dealer })
  }

  async function deletePlay(play) {
    const isConfirmed = window.confirm(`Willst du das letzte Spiel löschen?`)
    if (isConfirmed) {
      await deletePlayDocument(play.id)

      // Set dealer to previous player
      const dealer = ((((game.dealer - 2) % 4) + 4) % 4) + 1
      await updateGameDocument(game.id, { dealer: dealer })
    }
  }

  function newPlay() {
    router(`/game/${params.id}/play`)
  }
</script>

<h1 class="my-4">{game.name}</h1>

<div class="container">
  <Chart
    labels={[game.p1.name, game.p2.name, game.p3.name, game.p4.name]}
    xAxis={[0, ...Array.from({length: descOrderedPlays.length}, (_, i) => i + 1)]}
    yAxis={[p1Earnings, p2Earnings, p3Earnings, p4Earnings]} />
</div>

<div class="container text-start text-nowrap lead">
  <h2>Spieler:</h2>

  <div class="row justify-content-between">
    <div class="col">
      <span>- {game.p1.name}:</span>
    </div>
    <div class="col text-end">
      <span class="monospace">{p1EarningsStr}</span> Punkte
    </div>
  </div>

  <div class="row justify-content-between">
    <div class="col">
      <span>- {game.p2.name}:</span>
    </div>
    <div class="col text-end">
      <span class="monospace">{p2EarningsStr}</span> Punkte
    </div>
  </div>

  <div class="row justify-content-between">
    <div class="col">
      <span>- {game.p3.name}:</span>
    </div>
    <div class="col text-end">
      <span class="monospace">{p3EarningsStr}</span> Punkte
    </div>
  </div>

  <div class="row justify-content-between">
    <div class="col">
      <span>- {game.p4.name}:</span>
    </div>
    <div class="col text-end">
      <span class="monospace">{p4EarningsStr}</span> Punkte
    </div>
  </div>

  <h2 class="text-start mt-4">Geber:</h2>
  <div class="ms-3 lead">
    {dealerName}
  </div>
  <div class="row align-items-center">
    <div class="col-8 d-flex justify-content-end">
      <button class="btn btn-lg btn-success" on:click={newPlay}
        >Spiel eintragen</button>
    </div>
    <div class="col-4  d-flex justify-content-end">
      <button class="btn btn-outline-danger" on:click={skipPlay}
        >Zamschmeißn</button>
    </div>
  </div>
  <hr />

  <h2>Spiele:</h2>

  {#each descOrderedPlays as play, i}
    <div class="row justify-content-between text-center fs-6 px-1">
      <div class="col-3 border">
        {play.isSkip ? 'Zamgschmissn' : play.isSolo ? 'Solo' : 'Sauspiel'}
      </div>
      <div class="col-4 border">
        {#if !play.isSkip}
          {play.p1 ? play.p1.name : ''}
          {!play.isSolo ? '+' : ''}
          {play.p2 ? play.p2.name : ''}
        {/if}
      </div>
      <div class="col-5 d-flex border">
        <div class="col-11">
          {#if !play.isSkip}
            <span class="monospace"
              >{play.isSolo ? '3x ' : '\u00A0\u00A0\u00A0'}{play.isWon
                ? '+'
                : '-'}
              {Math.abs(play.price).toString().padStart(3, '\u00A0')}</span> P
          {/if}
        </div>

        <div class="col-1">
          {#if i === 0}
            <button
              class="btn btn-sm btn-outline-danger"
              on:click={() => deletePlay(play)}>X</button>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
