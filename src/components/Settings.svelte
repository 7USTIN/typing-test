<script lang='ts'>
	import { fade } from "svelte/transition"
	import { allLanguages, language, wordRange, upToDate } from "../utils/stores"

	let showModal = true

	function toggleModal(): void {
		showModal = !showModal
	}

	function setLanguage(key: string): void {
		if ($language !== allLanguages[key]) {
			$language = allLanguages[key]
			$upToDate = false
		}
	}

	function setWordRange(range: string): void {
		if ($wordRange !== range) {
			$wordRange = range
			$upToDate = false
		}
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
					<div class="languages">
						<div class="header">
							<h1>Language</h1>
							<div class="line" />
						</div>

						<div class="row">
							{#each Object.keys(allLanguages) as key}
								<button 
									class:selected={key === $language.name} 
									on:click={() => setLanguage(key)}
								>
									{key}
								</button>
							{/each}
						</div>
					</div>

					<div class="word-ranges">
						<div class="header">
							<h1>Word Range</h1>
							<div class="line" />
						</div>

						<div class="row">
							{#each ["TOP_200", "TOP_1000"] as range}
								<button
									class:selected={range === $wordRange}
									on:click={() => setWordRange(range)}
								>
									{range.split("_").join(" ").toLowerCase()}
								</button>
							{/each}
						</div>
					</div>
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
					width: 70%;
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
					.languages, .word-ranges {
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
								min-width: 70px;
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

					.word-ranges {
						.row {
							button {
								min-width: 80px;
							}
						}
					}
				}
			}
		}
	}
</style>