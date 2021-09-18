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
		padding: 12px 16px;
		width: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			font-size: 22px;
		}

		.line {
			margin: 8px 0;
			height: 1px;
			width: 100%;
			background: var(--second-text);
		}

		p {
			color: var(--second-text);
			font-size: 13px;
		}
	}
</style>