<script lang='ts'>
	import english from "../languages/englishWords"

	interface char {
		char: string,
		hit: boolean,
		error: boolean,
		current: boolean
	}

	let words: char[][] = getRandomWords(20)
	let charIdx = 0
	let wordIdx = 0

	function getRandomItem(array: any[]): [] {
		return array[array.length * Math.random() | 0]
	}

	function pushChar(char: string, error: boolean): char {
		return {
			char,
			error,
			hit: false,
			current: false,
		}
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
				array[i].push(pushChar(words[i][j], false))
			}
			array[0][0].current = true
			
			if (i + 1 !== numWords) {
				array[i].push(pushChar(" ", false))
			}
		}

		console.log(array)
		return array
	}

	function reset() {
		[charIdx, wordIdx] = [0, 0]
		words = getRandomWords(20)
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === "Tab") {
			e.preventDefault()
			reset()
			return 
		}

		if (e.key === words[wordIdx][charIdx].char) {
			words[wordIdx][charIdx].hit = true
			words[wordIdx][charIdx].current = false
			
			if (charIdx + 1 !== words[wordIdx].length) {
				charIdx++
			} else if (wordIdx + 1 !== words.length) {
				wordIdx++
				charIdx = 0
			}

			words[wordIdx][charIdx].current = true
		} else if (e.key.length === 1) {
			words[wordIdx].splice(charIdx, 0, pushChar(e.key, true))
			charIdx++
			words = words
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section>
	<div class="type-test-wrapper">
		<div class="type-test">
			{#each words as word, wIdx (wIdx)}
				<p>
					{#each word as {char, hit, error, current}, cIdx (cIdx)}
						<span class:hit class:error class:current class="char">
							{#if char === " "}
								&nbsp 
							{:else}
								{char}
							{/if}
						</span>
					{/each}
				</p>
			{/each}
		</div>

		<div class="fade left" />
		<div class="fade right" />
		<div class="cursor" />
	</div>

	<div class="tips">
		<key>tab</key>
		- restart test
	</div>
</section>

<style lang='scss'>
	section {
		width: 100vw;
		height: 100vh;
		display: flex; 
		align-items: center;
		justify-content: center;

		.type-test-wrapper {
			position: relative;
			width: 50%;
			height: 100px;
			overflow: hidden;

			.fade {
				position: absolute;
				top: 0;
				height: 100%;
				width: 10%;
			}

			.left {
				left: 0;
				background: linear-gradient(to right, var(--bg) , transparent);
			}

			.right {
				right: 0;
				background: linear-gradient(to left, var(--bg) , transparent);
			}

			.type-test {
				display: flex;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				// left: 50%;
	
				.char {
					color: var(--text);
					font-size: 20px;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
				}
		
				.hit {
					color: var(--second-text) !important;
				}
		
				.error {
					color: rgb(var(--error-text)) !important;
					background: rgba( var(--error-text), 0.1);
				}
	
				.current {
					font-weight: 700;
				}
			}
		}

		.tips {
			position: fixed;
			bottom: 72px;
			font-size: 15px;

			key {
				background: var(--text);
				color: var(--bg);
				padding: 1px 5px;
				font-size: 14px;
			}
		}
	}
</style>