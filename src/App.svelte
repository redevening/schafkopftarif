<main class="mx-auto text-center">
	<svelte:component this={page} params={params}/>
</main>

<script>
	import Home from "./pages/Home.svelte"
	import NewPlay from "./pages/NewPlay.svelte"
	import GameOverview from "./pages/GameOverview.svelte";
	import NewGame from "./pages/NewGame.svelte"
	import router from "page"

	//routing
	let page, params
	router("/", () => page = Home)
	router("/game", () => page = NewGame)
	router("/game/:id", (context, next) => {
		params = context.params
		next()
	}, () => page = GameOverview);
	router("/game/:id/play", (context, next) => {
		params = context.params
		next()
	},() => page = NewPlay)


	router.start()
</script>

<style>
	main {
		max-width: 700px;
	}
</style>