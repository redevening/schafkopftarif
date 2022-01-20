<script>
  import { emptyPlay, emptyGame, calculatePlayPrice } from "../common/game";
  import {
    createPlayDocument,
    fetchGameDocumentRealtime,
    unsubscribe,
    updateGameDocument,
  } from "../common/db";
  import { onMount, onDestroy } from "svelte";
  import router from "page";

  export let params;

  let game = emptyGame;
  let play = emptyPlay;
  $: price = calculatePlayPrice(play);
  $: players = [undefined, game.p1, game.p2, game.p3, game.p4];

  onMount(() => {
    fetchGameDocumentRealtime(params.id, (gameData) => {
      game = gameData;
      play = {
        ...emptyPlay,
        gameId: game.id,
        p1: game.p1,
        p2: game.p2,
        players: [game.p1, game.p2, game.p3, game.p4],
        sauspielPrice: game.sauspiel,
        soloPrice: game.solo,
        extraPrice: game.extra,
      };
    });
  });
  onDestroy(() => unsubscribe());

  function toggleIsSolo() {
    play.isSolo = !play.isSolo;
    if (play.isSolo) {
      play.p2 = null;
    }
  }

  function togglePlayer(i) {
    const player = players[i];

    //toggle same player button
    if (play.p1 === player) {
      play.p1 = null;
      return;
    }
    if (play.p2 === player) {
      play.p2 = null;
      return;
    }

    if (play.isSolo) {
      // solo player is alone
      play.p1 = player;
      play.p2 = null;
    } else {
      if (!play.p1) {
        play.p1 = player;
        return;
      }
      if (!play.p2) {
        play.p2 = player;
        return;
      }
      // Two players are already set, select a new one
      play.p1 = player;
      play.p2 = null;
    }
  }
  function toggleSchneider() {
    play.schneider = !play.schneider;
    if (!play.schneider) {
      play.schwarz = false;
    }
  }

  function toggleSchwarz() {
    play.schwarz = !play.schwarz;
    if (play.schwarz) {
      play.schneider = true;
    }
  }

  async function recordPlay() {
    // Check if required player count is correct
    if (play.isSolo && ((play.p1 && play.p2) || (!play.p1 && !play.p2))) {
      alert("Ein Spieler beim Solo!");
      return false;
    }
    if (!play.isSolo && !(play.p1 && play.p2)) {
      alert("Zwei Spieler beim Sauspiel!");
      return false;
    }

    // record game
    play.price = price;
    await createPlayDocument(play);

    // Set dealer to next player
    game.dealer = (game.dealer % 4) + 1;
    await updateGameDocument(game.id, { dealer: game.dealer });

    router(`/game/${params.id}`);
  }
</script>

<form on:submit|preventDefault={recordPlay}>
  <div class="container text-start my-1">
    <div class="row justify-content-center px-2">
      <div class="col-6 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="sauspiel"
          autocomplete="off"
          checked={!play.isSolo}
          on:click|preventDefault={toggleIsSolo}
        />
        <label
          class="btn btn-lg btn-outline-success shadow-none"
          for="sauspiel"
          on:click|preventDefault={toggleIsSolo}>Sauspiel</label
        >
      </div>
      <div class="col-6 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="solo"
          autocomplete="off"
          checked={play.isSolo}
          on:click|preventDefault={toggleIsSolo}
        />
        <label
          class="btn btn-lg btn-outline-danger shadow-none"
          for="solo"
          on:click|preventDefault={toggleIsSolo}>Solo</label
        >
      </div>
    </div>

    <h2 class="mt-4">Spieler:</h2>
    <div class="row justify-content-center my-3 px-2">
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p1"
          autocomplete="off"
          checked={play.p1 === players[1] || play.p2 === players[1]}
          on:click|preventDefault={() => togglePlayer(1)}
        />
        <label
          class="btn btn-lg btn-outline-primary shadow-none"
          for="p1"
          on:click|preventDefault={() => togglePlayer(1)}>{game.p1.name}</label
        >
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p2"
          autocomplete="off"
          checked={play.p1 === players[2] || play.p2 === players[2]}
          on:click|preventDefault={() => togglePlayer(2)}
        />
        <label
          class="btn btn-lg btn-outline-secondary shadow-none"
          for="p2"
          on:click|preventDefault={() => togglePlayer(2)}>{game.p2.name}</label
        >
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p3"
          autocomplete="off"
          checked={play.p1 === players[3] || play.p2 === players[3]}
          on:click|preventDefault={() => togglePlayer(3)}
        />
        <label
          class="btn btn-lg btn-outline-info shadow-none"
          for="p3"
          on:click|preventDefault={() => togglePlayer(3)}>{game.p3.name}</label
        >
      </div>
      <div class="col-3 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="p4"
          autocomplete="off"
          checked={play.p1 === players[4] || play.p2 === players[4]}
          on:click|preventDefault={() => togglePlayer(4)}
        />
        <label
          class="btn btn-lg btn-outline-light shadow-none"
          for="p4"
          on:click|preventDefault={() => togglePlayer(4)}>{game.p4.name}</label
        >
      </div>
    </div>
    <hr />

    <div class="row justify-content-center">
      <div class="col-6 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="isWon"
          autocomplete="off"
          bind:checked={play.isWon}
        />
        <label
          class="btn btn-lg btn-outline-success shadow-none fs-1"
          for="isWon">Gewonnen?</label
        >
      </div>
    </div>
    <hr />

    <h2>Extras:</h2>

    <div class="row justify-content-center px-2">
      <div class="col-6 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="schneider"
          autocomplete="off"
          checked={play.schneider}
          on:click|preventDefault={toggleSchneider}
        />
        <label
          class="btn btn-lg btn-outline-warning shadow-none"
          for="schneider"
          on:click|preventDefault={toggleSchneider}>Schneider</label
        >
      </div>
      <div class="col-6 d-grid gap-2 p-0">
        <input
          type="checkbox"
          class="btn-check"
          id="schwarz"
          autocomplete="off"
          checked={play.schwarz}
          on:click|preventDefault={toggleSchwarz}
        />
        <label
          class="btn btn-lg btn-outline-danger shadow-none"
          for="schwarz"
          on:click|preventDefault={toggleSchwarz}>Schwarz</label
        >
      </div>
    </div>

    <div class="row justify-content-around align-items-center my-2">
      <div class="col-5 row justify-content-end align-items-center">
        Läufer: <button
          class="btn btn-dark col-3 ms-2"
          on:click|preventDefault={() =>
            (play.lauf = play.lauf > 0 ? play.lauf - 1 : play.lauf)}>-</button
        >
      </div>
      <div class="col-2 text-center fs-3">
        <div class="circle">{play.lauf}</div>
      </div>
      <div class="col-5 row justify-content-start align-items-center">
        <button
          class="btn btn-dark col-3"
          on:click|preventDefault={() =>
            (play.lauf = play.lauf < 14 ? play.lauf + 1 : play.lauf)}>+</button
        >
      </div>
    </div>

    <div class="row justify-content-around align-items-center my-2">
      <div class="col-5 row justify-content-end align-items-center">
        Klopfer: <button
          class="btn btn-dark col-3 ms-2"
          on:click|preventDefault={() =>
            (play.klopf = play.klopf > 0 ? play.klopf - 1 : play.klopf)}
          >-</button
        >
      </div>
      <div class="col-2 text-center fs-3">
        <div class="circle">{play.klopf}</div>
      </div>
      <div class="col-5 row justify-content-start align-items-center">
        <button
          class="btn btn-dark col-3"
          on:click|preventDefault={() =>
            (play.klopf = play.klopf < 6 ? play.klopf + 1 : play.klopf)}
          >+</button
        >
      </div>
    </div>
  </div>
  <hr />
  <h2>
    Preis: {play.isSolo ? "3 x" : ""}
    {price} Punkte {play.isSolo ? `(${3 * price} P)` : ""}
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
</style>
