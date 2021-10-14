<h1 class="my-4">{params.id}</h1>

<div class="container text-start text-nowrap lead">
    <h2>Spieler:</h2>

    <div class="row justify-content-between">
        <div class="col">
            <span>- Tom:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">+ &nbsp;&nbsp;110</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- Hadde:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">+ &nbsp;&nbsp;&nbsp;30</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- Wal:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">+ &nbsp;&nbsp;270</span> Punkte
        </div>
    </div>

    <div class="row justify-content-between">
        <div class="col">
            <span>- Ruben:</span>
        </div>
        <div class="col text-end">
            <span class="monospace">- &nbsp;&nbsp;410</span> Punkte
        </div>
    </div>


    <h2 class="text-start mt-4">Geber:</h2>
    <div class="ms-3 lead">
        Tom
    </div>
    <div class="row justify-content-center">
        <div class="col-6 d-grid gap-2">
            <button type="button" class="btn btn-lg btn-success my-2" on:click="{openGame}">Spiel eintragen</button>
        </div>
    </div>
    <hr>

    <h2>Spiele:</h2>

    <div class="row justify-content-between text-center fs-6">
        <div class="col-3 border">
            Sauspiel
        </div>
        <div class="col-4 border">
            Tom + Wal
        </div>
        <div class="col-5 border">
            <span class="monospace">&nbsp;&nbsp; +&nbsp;&nbsp;&nbsp;40</span> P
        </div>
    </div>

    <div class="row justify-content-between text-center fs-6">
        <div class="col-3 border">
            Solo
        </div>
        <div class="col-4 border">
            Ruben
        </div>
        <div class="col-5 border">
            <span class="monospace">3x -&nbsp;&nbsp;100</span> P
        </div>
    </div>

    <div class="row justify-content-between text-center fs-6">
        <div class="col-3 border">
            Sauspiel
        </div>
        <div class="col-4 border">
            Hadde + Tom
        </div>
        <div class="col-5 border">
            <span class="monospace">&nbsp;&nbsp; +&nbsp;&nbsp;&nbsp;20</span> P
        </div>
    </div>

    <div class="row justify-content-between text-center fs-6">
        <div class="col-3 border">
            Solo
        </div>
        <div class="col-4 border">
            Wal
        </div>
        <div class="col-5 border">
            <span class="monospace">3x +&nbsp;&nbsp;50</span> P
        </div>
    </div>
</div>

<script>
    import router from "page"

    export let params

    function openGame() {
        console.log(params)
        router(`/round/1/game`)
    }



</script>