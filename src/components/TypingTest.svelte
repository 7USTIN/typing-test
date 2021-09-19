<script lang='ts'>
	import { onMount, tick } from "svelte"
	import Statistic from "./Statistic.svelte"
	import english from "../languages/englishWords"

	interface char {
		char: string,
		hit: boolean,
		error: boolean,
		current: boolean
	}

	let words: char[][] = getRandomWords(20)

	let typingTestEl: HTMLDivElement
	let wrapperEl: HTMLDivElement
	let charOffset = 0

	let charIdx = 0
	let wordIdx = 0

	let stats = {
		time: { name: "time", value: 0, stop: true },
		chars: { name: "characters", value: 0 },
		wpm: { name: "words/min", value: 0 },
		errors: { name: "errors", value: 0 },
		errorRate: { name: "error rate", value: "0%" },
		lastKey: { name: "last key", value: "" },
	}

	$: currentChar = document.getElementsByClassName("current")

	setInterval(() => {
		if (!stats.time.stop) {
			stats.time.value++
			stats.wpm.value = Math.floor((stats.chars.value / 5) / (stats.time.value / 60))
		}
	}, 1000) 
	

	function setOffset(): void {
		typingTestEl.style.left = wrapperEl.clientWidth / 2 - charOffset + "px"
	}

	onMount(() => {
		charOffset = currentChar[0].scrollWidth / 2
		setOffset()
	})

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

	function getRandomWords(numWords: number): [][] {
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
			
			if (i + 1 !== numWords) {
				array[i].push(pushChar(" ", false))
			}
			
			array[0][0].current = true
		}

		return array
	}

	async function reset(): Promise<void> {
		[charIdx, wordIdx] = [0, 0]
		words = getRandomWords(20)
		stats.time.value = 0
		stats.time.stop = true
		stats.chars.value = 0
		stats.wpm.value = 0
		stats.errors.value = 0
		stats.errorRate.value = "0%"
		stats.lastKey.value = ""

		await tick()

		charOffset = currentChar[0].scrollWidth / 2
		setOffset()
	}

	function handleKeydown(e: KeyboardEvent): void {	
		if (e.key === "Tab") {
			e.preventDefault()
			reset()
		}
		
		if (e.key.length !== 1) {
			return 
		}
		
		stats.time.stop = false
		stats.lastKey.value = e.key

		if (e.key === words[wordIdx][charIdx].char) {
			words[wordIdx][charIdx].hit = true
			words[wordIdx][charIdx].current = false

			stats.chars.value++
			
			if (charIdx + 1 !== words[wordIdx].length) {
				charIdx++
			} else if (wordIdx + 1 !== words.length) {
				wordIdx++
				charIdx = 0
			}
			
			words[wordIdx][charIdx].current = true
		} else {
			words[wordIdx].splice(charIdx, 0, pushChar(e.key, true))
			charIdx++
			words = words
			stats.errors.value++
		}
		
		const errorRate = (stats.errors.value / stats.chars.value) * 100
		stats.errorRate.value = errorRate >= 100 ? "100%" : !errorRate ? "0%" : errorRate.toFixed(2) + "%"

		charOffset += currentChar[0].scrollWidth
		setOffset()
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={setOffset} />

<section>
	<div class="typing-test-wrapper" bind:this={wrapperEl}>
		<div 
			class="typing-test" 
			bind:this={typingTestEl}
		>
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
	</div>

	<div class="stats">
		{#each Object.values(stats) as {name, value}, sIdx (sIdx)}
			<Statistic {name} {value} />
		{/each}
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
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.typing-test-wrapper {
			position: relative;
			width: 50%;
			height: 100px;
			overflow: hidden;

			@media screen and (max-width: 1500px) {
				width: 60%;
			}

			@media screen and (max-width: 1000px) {
				width: 80%;
			}

			@media screen and (max-width: 500px) {
				width: 95%;
			}

			&::after {
				content: "";
				position: absolute;
				left: 50%;
				top: calc(50% + 20px);
				transform: translate(-50%, -50%);
				width: 0; 
				height: 0; 
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-bottom: 5px solid var(--second-text);
			}

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

			.typing-test {
				display: flex;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
	
				.char {
					color: var(--text);
					font-size: 20px;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					font-weight: 400;
				}
		
				.hit {
					color: var(--second-text) !important;
				}
		
				.error {
					color: rgb(var(--error-text)) !important;
					background: rgba( var(--error-text), 0.1);
				}
	
				.current {
					font-weight: 900;
				}
			}
		}

		.stats {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}

		.tips {
			position: fixed;
			bottom: 80px;
			font-size: 15px;

			@media screen and (max-width: 1500px) {
				font-size: 14px;
				bottom: 72px;
			}

			key {
				background: var(--text);
				color: var(--bg);
				padding: 1px 5px;
				font-size: 14px;

				@media screen and (max-width: 1500px) {
					font-size: 13px;
				}
			}
		}
	}
</style>