<h1 class="my-4">Runde erstellen</h1>
<form on:submit|preventDefault="{startRound}">
    <div class="form-group container">
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="name" bind:value={name} required>
                <label for="name">Rundenname</label>
            </div>
        </div>
        <hr>

        <h2>Spieler</h2>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p1" bind:value={p1} required>
                <label for="p1">Spieler 1</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p2" bind:value={p2} required>
                <label for="p2">Spieler 2</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control"  id="p3" bind:value={p3} required>
                <label for="p3">Spieler 3</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p4" bind:value={p4} required>
                <label for="p4">Spieler 4</label>
            </div>
        </div>
        <hr>

        <h2>Tarife</h2>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="sauspiel">Sauspiel:</label>
            </div>
            <div class="col-3 col-sm-2">
                <input id="sauspiel" class="form-control" bind:value={sauspiel} type="number" required>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="solo">Solo:</label>
            </div>
            <div class="col-3 col-sm-2">
                <input id="solo" class="form-control" bind:value={solo} type="number" required>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="extra">Extras:</label>
            </div>
            <div class="col-3 col-sm-2">
                <input id="extra" class="form-control" bind:value={extra} type="number" required>
            </div>
        </div>
        <hr>

        <button type="submit" class="btn btn-lg btn-success my-4">Runde starten</button>
    </div>
</form>

<script>
    import {GAMES_KEY, Game} from "../common/game"
    import router from "page"
    let name = "Sauspielfreunde", p1 = "P1",  p2 = "P2",  p3 = "P3",  p4 = "p4", sauspiel = 20, solo = 50, extra = 10

    function startRound() {
        let allGames = []
        try {
            allGames = JSON.parse(localStorage.getItem(GAMES_KEY)) || []
        } catch(e) {
            console.error("Error retrieving games", e)
        }
        
        const id = allGames.length;
        const game = new Game(id, name, p1, p2, p3, p4, sauspiel, solo, extra);
        allGames.push(game)
        localStorage.setItem(GAMES_KEY, JSON.stringify(allGames))
        router(`/game/${game.id}`)
    }
</script>