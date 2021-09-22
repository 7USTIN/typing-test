<script lang='ts'>
	let theme = "dark"
	theme = localStorage.getItem("theme")
	
	function toggleTheme(): void {
		theme = theme === "dark" ? "light" : "dark"
		localStorage.setItem("theme", theme)
	}
	
	$: document.body.setAttribute("data-theme", theme)
</script>

<section>
	<button on:click={toggleTheme}>
		<i class="material-icons">
			{theme === "dark" ? "light_mode" : "dark_mode"}
		</i>
	</button>

	<a href="https://github.com/7USTIN/typing-test" target="_blank">
		<button>
			<i class="material-icons">code</i>
		</button>
	</a>
</section>

<style lang='scss'>
	section {
		position: absolute;
		top: 24px;
		right: 24px;

		@media screen and (min-width: 1000px) {
			top: 32px;
			right: 32px;
		}

		@media screen and (min-width: 1400px) {
			right: 48px;
		}

		button {
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
	}
</style>