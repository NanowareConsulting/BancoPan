<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Main from '$components/main.svelte';
	import Page from '$components/page.svelte';
	import { API } from '$api';

	let cpf = '';
	let password = '';

	async function submit(e: Event) {
		e.preventDefault();
		try {
			await API.loginOldUser({ cpf, password });

			window.location.href = '/user';
		} catch (err) {
			console.log(err);
		}
	}
</script>

<Page>
	<Main>
		<div id="wrapper">
			<h1>Entrar</h1>
			<form>
				<Textfield variant="outlined" bind:value={cpf} label="CPF" required />
				<Textfield
					variant="outlined"
					bind:value={password}
					type="password"
					label="Senha"
					required
				/>
				<Button variant="outlined" on:click={submit}>Entrar</Button>
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
