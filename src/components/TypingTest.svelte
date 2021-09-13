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
					char: words[i][j],
					hit: false,
				})
			}

			array[i].push({ char: " ", hit: false })
		}

		console.log(array)
		return array
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === words[wordIdx][charIdx].char) {
			words[wordIdx][charIdx].hit = true
			
			if (charIdx + 1 !== words[wordIdx].length) {
				charIdx++
			} else {
				wordIdx++
				charIdx = 0
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section>
	{#each words as word, idx (idx)}
		<p>
			{#each word as {char, hit}, idx (idx)}
				<span class:hit class="char">
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
	}
</style>