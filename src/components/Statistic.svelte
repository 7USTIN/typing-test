<script lang='ts'>
	export let name: string
	export let value: string | number

	function formatTime(s: number): string {
		return ((s-(s%=60))/60+(9<s?':':':0')+s).padStart(5, "0")
	}
</script>

<div class="wrapper">
	<h2>
		{name === "time" ? formatTime(+value) : value}
	</h2>
	<div class="line" />
	<p>{name}</p>
</div>

<style lang='scss'>
	.wrapper {
		margin: 12px 10px;
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			font-size: 22px;
			height: 29px;
		}

		.line {
			margin: 8px 0;
			height: 1px;
			width: 100%;
			background: var(--second-text);
			opacity: 0.5;
		}

		p {
			color: var(--second-text);
			font-size: 13px;
		}
	}
</style>