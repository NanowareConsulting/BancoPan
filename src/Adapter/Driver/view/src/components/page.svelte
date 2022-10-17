<script>
	import Header from '$components/header.svelte';

	export let notify = false;
</script>

<div id="page">
	<Header {notify} />
	<slot />
</div>

<style>
	#page {
		position: relative;
		width: 100vw;
		min-height: 100vh;
		padding-top: 63px;
		box-sizing: border-box;
	}
</style>
