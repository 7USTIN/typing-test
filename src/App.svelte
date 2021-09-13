<script lang="ts">
	import Theme from "./components/Theme.svelte"
	import TypingTest from "./components/TypingTest.svelte"
</script>

<main>
	<Theme />
	<TypingTest />
</main>

<style style="scss">
	:global(:root) {
		--bg: #ffffff;
		--second-bg: #f8f9fa;
		--text: #151515;
		--second-text: #59595a;
		--border: #e4e4e4;
	}

	:global([data-theme="dark"]) {
		--bg: #151515;
		--second-bg: #1c1c1c;
		--text: #ffffff;
		--second-text: #adadad;
		--border: #333333;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body, button, input) {
		font-family: "Inter", sans-serif;
		font-size: 14px;
		background: var(--bg);
		color: var(--text);
	}
</style>