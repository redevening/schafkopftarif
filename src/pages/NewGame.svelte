<script>
  import { createGameDocument } from '../common/db'
  import router from 'page'
  import { stringToColor } from '../common/util'

  let players = [{
    name: 'ONE'
  },
  {
    name: 'TWO'
  },
  {
    name: 'THREE'
  },
  {
    name: 'FOUR'
  }]
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
  const NAMES = [
    'Ade',
    'Anderl',
    'Beda',
    'Done',
    'Franz',
    'Schos',
    'Lenzi',
    'Wast',
    'Xare',
    'Babett',
    'Betti',
    'Anni',
    'Evi',
    'Gerta',
    'Kathi',
    'Magda',
    'Reserl',
    'Sigi',
    'Vroni',
    'Zenze',
  ]
  function randomName() {
    const rnd = NAMES[Math.floor(Math.random() * NAMES.length)]
    NAMES.splice(NAMES.indexOf(rnd), 1)
    return rnd
  }
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
      name: randomName(),
    },
    p2: {
      name: randomName(),
    },
    p3: {
      name: randomName(),
    },
    p4: {
      name: randomName(),
    },
    sauspiel: 20,
    solo: 50,
    extra: 10,
    dealer: 1,
  }

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
    <!-- <div class="row justify-content-center my-2">
      <div class="col-2">
        <img
          src="https://avatars.dicebear.com/api/adventurer/{game.p1
            .name}-image.svg"
          alt="avatar"
          height="60px" />
      </div>
      <div class="form-floating col-sm-6">
        <input
          class="form-control"
          id="p1"
          bind:value={game.p1.name}
          required />
        <label for="p1">Spieler 1</label>
      </div>
    </div>
    <div class="row justify-content-center my-2">
      <div class="col-2">
        <img
          src="https://avatars.dicebear.com/api/adventurer/{game.p2
            .name}-image.svg"
          alt="avatar"
          height="60px" />
      </div>
      <div class="form-floating col-sm-6">
        <input
          class="form-control"
          id="p2"
          bind:value={game.p2.name}
          required />
        <label for="p2">Spieler 2</label>
      </div>
    </div>
    <div class="row justify-content-center my-2">
      <div class="col-2">
        <img
          src="https://avatars.dicebear.com/api/adventurer/{game.p3
            .name}-image.svg"
          alt="avatar"
          height="60px" />
      </div>
      <div class="form-floating col-sm-6">
        <input
          class="form-control"
          id="p3"
          bind:value={game.p3.name}
          required />
        <label for="p3">Spieler 3</label>
      </div>
    </div>
    <div class="row justify-content-center my-2">
      <div class="col-2">
        <img
          src="https://avatars.dicebear.com/api/adventurer/{game.p4
            .name}-image.svg"
          alt="avatar"
          height="60px" />
      </div>
      <div class="form-floating col-sm-6">
        <input
          class="form-control"
          id="p4"
          bind:value={game.p4.name}
          required />
        <label for="p4">Spieler 4</label>
      </div>
    </div> -->

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
