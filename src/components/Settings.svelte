<script lang='ts'>
    import { fade } from "svelte/transition"

	let showModal = true

	function toggleModal(): void {
		showModal = !showModal
	}

	// STYLE
	// RESPONSIVE
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
				width: 20%;
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
					height: 7.5%;
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
			}
		}
	}
</style>