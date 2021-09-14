<script lang='ts'>
	import english from "../languages/englishWords"

	const words = getRandomWords(20)

	let charIdx = 0
	let wordIdx = 0

	function getRandomItem(array: any[]): [] {
		return array[array.length * Math.random() | 0]
	}

	function getRandomWords(numWords: number): [][] { // TODO
		const array = []
		const words = []

		for (let i = 0; i < numWords; i++) {
			words.push(getRandomItem(english.TOP_200))
		}

		for (let i = 0; i < numWords; i++) {
			array.push([])

			for (let j = 0; j < words[i].length; j++) {
				array[i].push({
					char: words[i][j], hit: false, error: false,
				})
			}
			
			if (i + 1 !== numWords) {
				array[i].push({
					char: " ", hit: false, error: false 
				})
			}
		}

		console.log(array)
		return array
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === words[wordIdx][charIdx].char) {
			words[wordIdx][charIdx].hit = true
			
			if (charIdx + 1 !== words[wordIdx].length) {
				charIdx++
			} else if (wordIdx + 1 !== words.length) {
				wordIdx++
				charIdx = 0
			}
		} else {
			words[wordIdx].splice(charIdx, 0, {
				char: e.key, hit: false, error: true
			})
			charIdx++
			words = words
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section>
	{#each words as word, wIdx (wIdx)}
		<p>
			{#each word as {char, hit, error}, cIdx (cIdx)}
				<span class:hit class:error class="char">
					{#if char === " "}
						&nbsp 
					{:else}
						{char}
					{/if}
				</span>
			{/each}
		</p>
	{/each}
</section>

<style lang='scss'>
	section {
		width: 100vw;
		height: 100vh;
		display: flex; 
		align-items: center;
		justify-content: center;

		.char {
			color: var(--second-text);
			font-size: 20px;
			user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
		}

		.hit {
			color: var(--text) !important;
		}

		.error {
			color: rgb(var(--error-text)) !important;
			background: rgba( var(--error-text), 0.1);
		}
	}
</style>