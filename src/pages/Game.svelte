<h1 class="my-4">Spiel eintragen</h1>

<form>
    <div class="container text-start">
        <div class="row justify-content-center px-2">
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="sauspiel" checked autocomplete="off">
                <label class="btn btn-lg btn-outline-success shadow-none" for="sauspiel">Sauspiel</label>
            </div>
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="solo" autocomplete="off">
                <label class="btn btn-lg btn-outline-danger shadow-none" for="solo">Solo</label>
            </div>
        </div>

        <h2 class="mt-4">Spieler:</h2>
        <div class="row justify-content-center my-3 px-2">
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p1" checked autocomplete="off">
                <label class="btn btn-lg btn-outline-primary shadow-none" for="p1">Tom</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p2" autocomplete="off">
                <label class="btn btn-lg btn-outline-secondary shadow-none" for="p2">Hadde</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p3" checked autocomplete="off">
                <label class="btn btn-lg btn-outline-info shadow-none" for="p3">Wal</label>
            </div>
            <div class="col-3 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="p4" autocomplete="off">
                <label class="btn btn-lg btn-outline-light shadow-none" for="p4">Ruben</label>
            </div>
        </div>

        <h2>Extras:</h2>

        <div class="row justify-content-center px-2">
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="schneider" checked autocomplete="off">
                <label class="btn btn-lg btn-outline-warning shadow-none" for="schneider">Scheider</label>
            </div>
            <div class="col-6 d-grid gap-2 p-0">
                <input type="checkbox" class="btn-check" id="schwarz" autocomplete="off">
                <label class="btn btn-lg btn-outline-danger shadow-none" for="schwarz">Schwarz</label>
            </div>
        </div>

        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="laufer">Läufer:</label>
            </div>
            <div class="col-4 col-sm-3">
                <select class="form-select">
                    {#each Array.from({length: 15}) as _, i}
                    <option value="{i}">{i}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 text-end">
                <label class="col-form-label light" for="sauspiel">Klopfer/Contra/Re:</label>
            </div>
            <div class="col-4 col-sm-3">
                <select class="form-select">
                    {#each Array.from({length: 7}) as _, i}
                    <option value="{Math.pow(2,i)}">{`${Math.pow(2,i)} x`}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <hr>
    <h2>Preis: 50 Punkte</h2>
    <hr>
    <button type="submit" class="btn btn-lg btn-success my-4">Spiel eintragen</button>
</form>




<script>
    export let params
</script>