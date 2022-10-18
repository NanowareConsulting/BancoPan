<script>
	import Button from '@smui/icon-button';

	export let notify = false;

	function goToHome() {
		window.location.href = '/';
	}

	function goToRegister() {
		window.location.href = '/register';
	}

	function goToRegisterNewUser() {
		window.location.href = '/register-new';
	}
</script>

<header class="header">
	<img
		class="logo"
		src="https://www.bancopan.com.br/bancopan-institucional/conteudo/estrutura/assets/img/mh-icons/mh-icon--logo-desktop.svg"
		alt="Banco pan logo"
		on:mousedown={goToHome}
		on:touchstart={goToHome}
	/>
	<div class="button-group">
		{#if notify}
			<Button class="material-icons" on:click={goToRegisterNewUser}>notifications</Button>
		{/if}
		<a href="/login" class="link">Área do Cliente</a>
		<button on:click={goToRegister} class="button">Abrir conta</button>
	</div>
</header>

<style>
	.header {
		position: absolute;

		top: 0;
		left: 0;

		height: 63px;

		box-sizing: border-box;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		background-color: #fff;
		width: 100%;
	}

	.link {
		font-family: Montserrat, sans-serif;
		color: #414141;
		font-size: 16px;
		font-weight: 600;
		line-height: 26px;
		margin-right: 30px;
		text-decoration: none;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button {
		color: white;
		font-family: Montserrat, sans-serif;
		font-size: 14px;
		font-weight: 600;
		line-height: 21px;
		padding: 12px 21px;
		background-color: #039be5;
		border-radius: 12px;
		border: none;
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
			0 1px 3px 0 rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease-in-out;
	}
	.button:hover {
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
			0 3px 5px -1px rgba(0, 0, 0, 0.2);
	}

	.logo {
		margin: auto 0px;
		height: 100%;
	}
</style>
