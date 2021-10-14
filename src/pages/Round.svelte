<h1 class="my-4">Runde erstellen</h1>
<form on:submit|preventDefault="{startRound}">
    <div class="form-group container">
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="name" required>
                <label for="name">Rundenname</label>
            </div>
        </div>
        <hr>

        <h2>Spieler</h2>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p1" required>
                <label for="p1">Spieler 1</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p2" required>
                <label for="p2">Spieler 2</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p3" required>
                <label for="p3">Spieler 3</label>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <div class="form-floating col-sm-6">
                <input class="form-control" id="p4" required>
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
                <input id="sauspiel" class="form-control" value="10" type="number" required>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="solo">Solo:</label>
            </div>
            <div class="col-3 col-sm-2">
                <input id="solo" class="form-control" value="50" type="number" required>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="extra">Sauspiel:</label>
            </div>
            <div class="col-3 col-sm-2">
                <input id="extra" class="form-control" value="10" type="number" required>
            </div>
        </div>
        <hr>

        <button type="submit" class="btn btn-lg btn-success my-4">Runde starten</button>
    </div>
</form>

<script>
    function startRound(e) {
        alert("Test")
    }
</script>