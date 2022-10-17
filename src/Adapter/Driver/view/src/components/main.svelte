<div class="wrapper">
	<main class="main">
		<slot />
	</main>
</div>

<style>
	.wrapper {
		min-height: calc(100vh - 63px);
		height: 100%;
		width: 100%;
		background-color: #f5f5f5;
		display: flex;
	}

	.main {
		box-sizing: border-box;
		margin: 50px auto;
		background-color: white;
		width: 100%;
		max-width: 1000px;
		border-radius: 20px;
		padding: 50px;
		height: fit-content;
	}
</style>
