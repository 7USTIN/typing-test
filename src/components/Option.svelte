<script lang='ts'>
	export let name: string
</script>

<div class="wrapper">
	<div class="header">
		<h1>{name}</h1>
		<div class="line" />
	</div>

	<div class="row">
		<slot></slot>
	</div>
</div>

<style lang='scss'>
	.wrapper {
		.header {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			white-space: nowrap;
			justify-content: center;
			margin-bottom: 12px;

			h1 {
				font-size: 20px;
				font-weight: 500;
				margin-right: 16px;
			}

			.line {
				width: 100%;
				height: 1px;
				background: var(--border);
			}
		}
		
		.row {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 24px;
		}
	}
</style>