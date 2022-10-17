<script lang="ts">
	let cpf: string = '';

	function onSubmit() {
		window.location.href = `/old/user?cpf=${cpf}`;
	}
</script>

<div id="wrapper">
	<div id="grid">
		<div />
		<img
			id="credit"
			src="https://www.bancopan.com.br/bancopan-institucional/conteudo/templates/banner/13/assets/img/banner-desktop.webp"
			alt=""
		/>
	</div>
</div>

<style>
	#wrapper {
		width: 100vw;
		height: 486px;
		background-color: #07b2fd;

		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
	}

	#grid {
		max-width: 1000px;
		width: 100%;
		height: 100%;

		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	#credit {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
