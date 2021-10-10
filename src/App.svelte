<main>
	<div class="mx-5">
		<svelte:component this={page} params={params}/>
	</div>
</main>

<script>
	import Home from "./pages/Home.svelte"
	import Round from "./pages/Round.svelte"
	import RoundOverview from "./pages/RoundOverview.svelte";
	import router from "page"

	//routing
	let page, params
	router("/", () => page = Home)
	router("/round", () => page = Round)
	router("/round/:id", (ctx, next) => {
		params = ctx.params
		next()
	}, () => page = RoundOverview);
	router.start()
</script>

<style>
	main {
		text-align: center;
	}
</style>