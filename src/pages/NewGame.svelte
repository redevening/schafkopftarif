<script>
  import { createGameDocument, fetchPlayerDocumentsRealtime, unsubscribe } from '../common/db'
  import router from 'page'
  import { stringToColor } from '../common/util'
  import { onMount, onDestroy } from 'svelte'

  let allPlayers = [];
  const G1 = [
    'Zillertaler',
    'Alderstätter',
    'Biertrinker',
    'Sauspiel',
    'Schmusi',
    'Mercedeshasser',
    'Football',
    'Grisgram',
    'Chai-Latte',
    'Cappocino',
    'Herzbuben',
    'Bauhaus',
    'Armuts',
    'Links-Grün',
  ]
  const G2 = [
    'schwubsis',
    'heizungsbauern',
    'kartler',
    'freunde',
    'spezis',
    'audischrauber',
    'schwurbler',
    'vampirjaga',
    'säufer',
    'versifften',
    'Identitären',
  ]

  function randomGroup() {
    const g1 = G1[Math.floor(Math.random() * G1.length)]
    G1.splice(G1.indexOf(g1), 1)
    const g2 = G2[Math.floor(Math.random() * G2.length)]
    G2.splice(G2.indexOf(g2), 1)
    return `${g1}${g2}`
  }

  let game = {
    name: randomGroup(),
    p1: {
      name: '',
    },
    p2: {
      name: '',
    },
    p3: {
      name: '',
    },
    p4: {
      name: '',
    },
    sauspiel: 20,
    solo: 50,
    extra: 10,
    dealer: 1,
  }

  onMount(() => {
    fetchPlayerDocumentsRealtime((playersData) => {
      allPlayers = playersData

      for (let i = 0; i < 4; i++) {
        game['p' + (i+1)] = !game['p' + (i+1)].id ? allPlayers[Math.random()] : game['p' + (i+1)]  
      }
  })})
  onDestroy(() => unsubscribe())

  async function startRound() {
    await createGameDocument(game)
    router(`/`)
  }
</script>

<h1 class="my-4">Runde erstellen</h1>
<form on:submit|preventDefault={startRound}>
  <div class="form-group container">
    <div class="row justify-content-center my-2">
      <div class="form-floating col-sm-6">
        <input class="form-control" id="name" bind:value={game.name} required />
        <label for="name">Rundenname</label>
      </div>
    </div>
    <hr />

    <h2>Spieler</h2>

    <div class="parent">
      {#each [...Array(4).keys()].map(x => x + 1) as i}
        <div
          class="card m-2 pointer square"
          style="background-color: {stringToColor(
            game['p' + i].name
          )}; height: 14em"
          on:click={() => openPlayer(player)}>
          <img
            src="https://avatars.dicebear.com/api/adventurer/{game['p' + i].name}-image.svg"
            alt="avatar" />
          <div class="card-body">
            <p class="card-text fw-bold">
              {game['p' + i].name}
            </p>
          </div>
        </div>
      {/each}
    </div>







    <hr />

    <h2>Tarife</h2>
    <div class="row my-2">
      <div class="col-5 text-end">
        <label class="col-form-label light" for="sauspiel">Sauspiel:</label>
      </div>
      <div class="col-3 col-sm-2">
        <input
          id="sauspiel"
          class="form-control"
          bind:value={game.sauspiel}
          type="number"
          required />
      </div>
    </div>
    <div class="row my-2">
      <div class="col-5 text-end">
        <label class="col-form-label light" for="solo">Solo:</label>
      </div>
      <div class="col-3 col-sm-2">
        <input
          id="solo"
          class="form-control"
          bind:value={game.solo}
          type="number"
          required />
      </div>
    </div>
    <div class="row my-2">
      <div class="col-5 text-end">
        <label class="col-form-label light" for="extra">Extras:</label>
      </div>
      <div class="col-3 col-sm-2">
        <input
          id="extra"
          class="form-control"
          bind:value={game.extra}
          type="number"
          required />
      </div>
    </div>
    <hr />

    <button type="submit" class="btn btn-lg btn-success my-4"
      >Runde starten</button>
  </div>
</form>

<style>
  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
