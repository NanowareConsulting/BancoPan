<script lang="ts">
	import Main from '$components/main.svelte';
	import Page from '$components/page.svelte';

	import Card, { Content } from '@smui/card';
	import Button from '@smui/button';

	import { API } from '$api';
	import { onMount } from 'svelte';

	const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
		year: 'numeric',
		month: 'numeric'
	});

	let data: { user: any; creditCard: any; loan: any } | null = {
		user: {},
		creditCard: [],
		loan: []
	};

	let notify = false;

	async function getOldDashboard() {
		const urlParams = new URLSearchParams(window.location.search);
		let cpf = urlParams.get('cpf');

		if (!cpf) {
			cpf = window.prompt('Informe seu CPF') as string;

			if (!cpf) {
				window.location.href = '/';
			}
		}

		return await API.getOldDashboard(cpf);
	}

	onMount(async () => {
		data = await getOldDashboard();
		let email = data.user.email;

		data.creditCard.forEach((card: any) => {
			if (card.userEmail !== email) {
				notify = true;
			}
		});

		data.loan.forEach((loan: any) => {
			if (loan.userEmail !== email) {
				notify = true;
			}
		});
	});
</script>

<Page {notify}>
	<Main>
		<div id="wrapper">
			<div id="section">
				<h1>Usuário</h1>

				{#await data}
					<p>Carregando...</p>
				{:then data}
					<div id="user-data">
						<Card>
							<Content><span class="label">Nome:</span>{data?.user.name}</Content>
						</Card>
						<Card>
							<Content><span class="label">Email:</span>{data?.user.email}</Content>
						</Card>
						<Card>
							<Content><span class="label">CPF:</span>{data?.user.cpf}</Content>
						</Card>
					</div>
				{/await}
			</div>

			<div id="section">
				<div id="section-header">
					<h1>Cartões de Crédito</h1>
					<Button variant="outlined">Adicionar</Button>
				</div>
				{#await data}
					<p>Carregando...</p>
				{:then data}
					<div id="cards">
						<div id="card-data">
							{#each data?.creditCard as card}
								<Card>
									<Content><span class="label">Número do cartão:</span>{card.number}</Content>
									<Content><span class="label">Codigo:</span>{card.securityCode}</Content>
									<Content
										><span class="label">Data de expiração:</span>{dateFormatter.format(
											new Date(card.expirationDate)
										)}</Content
									>
									<Content><span class="label">Email:</span>{card.userEmail}</Content>
								</Card>
							{:else}
								<p>Nenhum cartão encontrado</p>
							{/each}
						</div>
					</div>
				{/await}
			</div>

			<div id="section">
				<h1>Empréstimos</h1>

				{#await data}
					<p>Carregando...</p>
				{:then data}
					<div id="cards">
						<div id="card-data">
							{#each data?.loan as loan}
								<Card>
									<Content><span class="label">Valor:</span>{loan.amount}</Content>
									<Content><span class="label">Taxa:</span>{loan.interest}</Content>
									<Content><span class="label">Email:</span>{loan.userEmail}</Content>
								</Card>
							{:else}
								<p>Nenhum cartão encontrado</p>
							{/each}
						</div>
					</div>
				{/await}
			</div>
		</div>
	</Main>
</Page>

<style>
	#wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto;
	}

	#section {
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding: 50px 0px;
		border-bottom: 1px solid #eaeaea;
		overflow: hidden;
	}

	#section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#user-data {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 40px;
		grid-template-areas: 'name name' 'email cpf';
	}

	#cards {
		overflow: auto;
		width: 100%;
	}

	#card-data {
		display: grid;
		grid-template-columns: repeat(auto-fill, auto);
		grid-template-rows: 1fr;
		grid-gap: 40px;
		grid-auto-flow: column;
	}

	#card {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		grid-gap: 40px;

		padding: 20px;

		border: 1px solid #eaeaea;
		border-radius: 12px;
	}

	.label {
		background-color: #303030;
		color: white;
		border-radius: 5px;
		padding: 5px;
		margin-right: 20px;

		white-space: nowrap;
	}
</style>
