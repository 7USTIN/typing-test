<script lang='ts'>
	import Option from "./Option.svelte"
	import { fade } from "svelte/transition"
	import { 
		allLanguages, language, wordRange, capitalize, modus, time, upToDate, wordCount 
	} from "../utils/stores"

	let showModal = true

	function toggleModal(): void {
		showModal = !showModal
	}

	function updateSettings(store, value): void {
		store.set(value)
		$upToDate = false
	}
</script>

<section>
	<button class="open" on:click={toggleModal}>
		<i class="material-icons">settings</i>
	</button>

	{#if showModal}
		<div class="modal-wrapper" on:click|self={toggleModal} transition:fade={{duration: 125}}>
			<div class="modal">
				<div class="header">					
					<h2>Settings</h2>

					<button on:click={toggleModal}>
						<i class="material-icons">close</i>
					</button>
				</div>

				<div class="settings">
					<Option name="Language">
						{#each Object.keys(allLanguages) as option}
							<button 
								class:selected={option === $language.name} 
								on:click={() => updateSettings(language, allLanguages[option])}
								style="min-width: 70px"
							>
								{option}
							</button>
						{/each}
					</Option>

					<Option name="Word Range">
						{#each ["TOP_25", "TOP_200", "TOP_1000"] as option}
							<button
								class:selected={option === $wordRange}
								on:click={() => updateSettings(wordRange, option)}
								style="min-width: 80px"
							>
								{option.split("_").join(" ").toLowerCase()}
							</button>
						{/each}
					</Option>

					<Option name="Capitalization">
						{#each [0, 25, 50, 75, 100] as option}
							<button
								class:selected={option === $capitalize}
								on:click={() => updateSettings(capitalize, option)}
								style="min-width: 45px;"
							>
								{option}%
							</button>
						{/each}
					</Option>

					<Option name="Modus"> 
						{#each ["time", "words"] as option} 
							<button
								class:selected={option === $modus}
								on:click={() => updateSettings(modus, option)}
								style="min-width: 60px;"
							>
								{option}
							</button>
						{/each}
					</Option>

					{#if $modus === "time"}
						<Option name="Time">
							{#each [15, 30, 60, 120] as option}
								<button
									class:selected={option === $time}
									on:click={() => updateSettings(time, option)}
									style="min-width: 45px;"
								>
									{option}
								</button>
							{/each}
						</Option>
					{:else}
						<Option name="Word Count">
							{#each [10, 25, 50, 100] as option}
								<button
									class:selected={option === $wordCount}
									on:click={() => updateSettings(wordCount, option)}
									style="min-width: 45px;"
								>
									{option}
								</button>
							{/each}
						</Option>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</section>

<style lang='scss'>
	section {
		position: absolute;
		top: 24px;
		left: 24px;

		@media screen and (min-width: 1000px) {
			top: 32px;
			left: 32px;
		}

		@media screen and (min-width: 1400px) {
			left: 48px;
		}

		.open {
			border: none;
			border-radius: 9999px;
			cursor: pointer;
			transition: 150ms;

			i {
				font-size: 24px;
				padding: 10px; 
				
				@media screen and (min-width: 1000px) {
					font-size: 26px;
				}
			}

			&:hover {
				background: var(--border);
			}
		}

		.modal-wrapper {
			background: rgba(0, 0, 0, 0.3);
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 3;
			cursor: pointer;

			.modal {
				position: absolute;
				top: 0;
				left: 0;
				width: 22.5%;
				height: 100%;
				background: var(--bg);
				cursor: initial;
				padding: 0 32px;
				
				@media screen and (max-width: 1500px) {
					padding: 0 24px;
					width: 30%;
				}
				
				@media screen and (max-width: 1000px) {
					padding: 0 16px;
					width: 50%;
				}
				
				@media screen and (max-width: 500px) {
					width: 80%;
					padding: 0 12px;
				}

				@media screen and (max-width: 300px) {
					width: 100%;
					padding: 0 12px;
				}

				.header {
					width: 100%;
					height: 10%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					button {
						border: none;
						border-radius: 9999px;
						cursor: pointer;
						transition: 150ms;
						background: transparent;
						margin-top: 2px;
						
						i {
							font-size: 24px;
							padding: 6px; 
							
							@media screen and (min-width: 1000px) {
								font-size: 26px;
							}
						}

						&:hover {
							background: var(--border);
						}
					}

					h2 {
						font-size: 21px;

						@media screen and (max-width: 500px) {
							font-size: 20px;
						}
					}
				}

				.settings {
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
		}
	}
</style>