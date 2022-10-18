<script>
	import { NotificationDisplay } from '@beyonk/svelte-notifications';

	import Header from '$components/header.svelte';
	import Footer from './footer.svelte';

	export let notify = false;
</script>

<NotificationDisplay />
<div id="page">
	<Header {notify} />
	<slot />
	<Footer />
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
