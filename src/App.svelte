<main class="mx-auto text-center">
	<svelte:component this={page} params={params}/>
</main>

<script>
	import Home from "./pages/Home.svelte"
	import Round from "./pages/Round.svelte"
	import RoundOverview from "./pages/RoundOverview.svelte";
	import Game from "./pages/Game.svelte"
	import router from "page"

	//routing
	let page, params
	router("/", () => page = Home)
	router("/round", () => page = Round)
	router("/round/:id", (context, next) => {
		params = context.params
		next()
	}, () => page = RoundOverview);
	router("/round/:id/game", (context, next) => {
		params = context.params
		next()
	},() => page = Game)


	router.start()
</script>

<style>
	main {
		max-width: 700px;
	}
</style>