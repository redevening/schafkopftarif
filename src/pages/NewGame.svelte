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
            <div class="col-2">
                <img src="https://avatars.dicebear.com/api/adventurer/{p1}-image.svg" alt="avatar" height="60px">
            </div>
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p1" bind:value={p1} required>
                <label for="p1">Spieler 1</label>
            </div>
            
        </div>
        <div class="row justify-content-center my-2">
            <div class="col-2">
                <img src="https://avatars.dicebear.com/api/adventurer/{p2}-image.svg" alt="avatar" height="60px">
            </div>
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p2" bind:value={p2} required>
                <label for="p2">Spieler 2</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="col-2">
                <img src="https://avatars.dicebear.com/api/adventurer/{p3}-image.svg" alt="avatar" height="60px">
            </div>
            <div class="form-floating col-sm-6">
                <input class="form-control"  id="p3" bind:value={p3} required>
                <label for="p3">Spieler 3</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="col-2">
                <img src="https://avatars.dicebear.com/api/adventurer/{p4}-image.svg" alt="avatar" height="60px">
            </div>
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
    const G1 = ["Zillertaler", "Alderstätter", "Biertrinker", "Sauspiel", "Schmusi", "Mercedeshasser", "Football", "Grisgram"]
    const G2 = ["schwubsis", "heizungsbauern", "kartler", "freunde", "spezis", "audischrauber"]
    const NAMES = ["Ade", "Anderl", "Beda", "Done", "Franz", "Schos", "Lenzi", "Wast", "Xare", "Babett", "Betti", "Anni", "Evi", "Gerta", "Kathi", "Magda", "Reserl", "Sigi", "Vroni", "Zenze"]
    function randomName() {
        const rnd = NAMES[Math.floor(Math.random()*NAMES.length)]
        NAMES.splice(NAMES.indexOf(rnd), 1)
        return rnd
    }
    function randomGroup() {
        const g1 =  G1[Math.floor(Math.random()*G1.length)]
        G1.splice(G1.indexOf(g1), 1)
        const g2 =  G2[Math.floor(Math.random()*G2.length)]
        G2.splice(G2.indexOf(g2), 1)
        return `${g1}${g2}`
    }
    
    let name = randomGroup(), p1 = randomName(),  p2 = randomName(),  p3 = randomName(),  p4 = randomName(), sauspiel = 20, solo = 50, extra = 10

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
        router(`/`)
    }
</script>