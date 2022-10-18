<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Main from '$components/main.svelte';
	import Page from '$components/page.svelte';
	import { API } from '$api';

	let email = '';
	async function submit(e: Event) {
		e.preventDefault();
		try {
			await API.applyForOldCreditCard({
				email
			});

			window.location.href = '/user';
		} catch (err) {}
	}
</script>

<Page>
	<Main>
		<div id="wrapper">
			<h1>Cadastre-se</h1>
			<form>
				<Textfield variant="outlined" bind:value={email} type="email" label="Email" required />
				<Button variant="outlined" on:click={submit}>Cadastrar</Button>
			</form>
		</div>
	</Main>
</Page>

<style>
	#wrapper {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	h1 {
		margin-bottom: 50px;
	}

	form {
		width: 60%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, auto);
		grid-gap: 30px;
	}
</style>
