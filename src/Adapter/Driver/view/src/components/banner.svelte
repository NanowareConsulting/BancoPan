<script lang="ts">
	let cpf: string = '';

	function onSubmit() {
		window.location.href = `/old/user?cpf=${cpf}`;
	}
</script>

<div id="wrapper">
	<div id="grid">
		<div>
			<h1 id="title">Nanoware <br /> <span>Solution</span></h1>
		</div>
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

	#title {
		margin-top: 150px;
		color: white;
		font-size: 70px;
		font-weight: 700;
		text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
	}

	#title span {
		color: #303030;
	}
</style>
