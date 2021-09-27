<script lang='ts'>
	import { settings, upToDate } from "../utils/stores"

	export let name: string
	export let options: any[]
	export let settingsKey: string
	export let minWidth: number
	export let optionUnit: string = "";

	function updateSettings(option): void {
		$settings[settingsKey] = option
		$upToDate = false

		localStorage.setItem("settings", JSON.stringify($settings))
	}
</script>

<div class="wrapper">
	<div class="header">
		<h1>{name}</h1>
		<div class="line" />
	</div>

	<div class="row">
		{#each options as option, idx (idx)}
			<button 
				class:selected={
					settingsKey === "language" ? 
					option.name === $settings[settingsKey].name : 
					option === $settings[settingsKey]
				}
				on:click={() => updateSettings(option)}
				style={`min-width: ${minWidth}px`}
			>
				{#if settingsKey === "language"}
					{option.name}
				{:else if settingsKey === "wordRange"}
					{option.split("_").join(" ").toLowerCase()}
				{:else}
				 	{option}{optionUnit}
				{/if}
			</button>
		{/each}
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

			button {
				font-weight: 400;
				text-transform: capitalize;
				cursor: pointer;
				padding: 4px;
				color: var(--second-text);
				background: var(--second-bg);
				border: 1px solid var(--border);
				border-radius: 6px;
				margin: 0 8px 8px 0;
				width: 30%;
				white-space: nowrap;
				transition: 150ms;

				&:hover {
					border: 1px solid var(--second-text);
				}

				@media screen and (max-width: 1000px) {
					font-size: 13px;
				}
			}

			.selected {
				color: var(--text);
				border: 1px solid var(--second-text);
				font-weight: 500;
			}
		}
	}
</style>