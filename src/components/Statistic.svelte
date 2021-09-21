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
		margin: 38px 10px;
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		@media screen and (max-width: 1500px) {
			width: 90px;
			margin: 24px 9px;
		}

		@media screen and (max-width: 1000px) {
			width: 80px;
			margin: 24px 8px;

		}
		
		h2 {
			font-size: 22px;
			height: 29px;

			@media screen and (max-width: 1500px) {
				font-size: 20px;
				height: 27px;
			}
			
			@media screen and (max-width: 1000px) {
				font-size: 18px;
				height: 25px;			
			}
		}

		.line {
			margin: 8px 0;
			height: 1px;
			width: 100%;
			background: var(--second-text);
			opacity: 0.5;

			@media screen and (max-width: 1500px) {
				margin: 7px 0;
			}

			@media screen and (max-width: 1000px) {
				margin: 6px 0;
			}
		}

		p {
			color: var(--second-text);
			font-size: 13px;

			@media screen and (max-width: 1500px) {
				font-size: 12px;
			}

			@media screen and (max-width: 1000px) {
				font-size: 11px;
			}
		}
	}
</style>