<script lang="ts">
	import Statistic from './Statistic.svelte';
	import { settings, upToDate } from '../utils/stores';
	import { onMount, tick } from 'svelte';

	interface char {
		char: string;
		hit: boolean;
		error: boolean;
		current: boolean;
	}

	let stats = {
		time: { name: 'time', value: 0, stop: true },
		chars: { name: 'characters', value: 0 },
		wpm: { name: 'words/min', value: 0 },
		errors: { name: 'errors', value: 0 },
		errorRate: { name: 'error rate', value: '0%' },
		lastKey: { name: 'last key', value: '' },
	};

	$: currentChar = document.getElementsByClassName('current');
	$: stats.wpm.value = !stats.time.value
		? 0
		: Math.floor(stats.chars.value / 5 / (stats.time.value / 60));
	$: wordCount = $settings.modus === 'words' ? $settings.wordCount : 25;

	let inputEl: HTMLInputElement;
	let typingTestEl: HTMLDivElement;
	let wrapperEl: HTMLDivElement;
	let words: char[][] = [];

	let charOffset = 0;
	let charIdx = 0;
	let wordIdx = 0;
	let progress = 0;
	let charCount = 0;

	setInterval(() => {
		if (!stats.time.stop) {
			stats.time.value++;
			getProgress();
		}
	}, 1000);

	onMount(async () => {
		inputEl.addEventListener('paste', (e) => e.preventDefault());
		inputEl.addEventListener('copy', (e) => e.preventDefault());

		words = getRandomWords(wordCount, true);

		await tick();

		charOffset = currentChar[0].getBoundingClientRect().width / 2;
		setOffset();
	});

	function setOffset(): void {
		typingTestEl.style.left = wrapperEl.clientWidth / 2 - charOffset + 'px';
	}

	function getRandomWords(numWords: number, start: boolean): [][] {
		const { language, wordRange, capitalize } = $settings;

		const array = [];
		const randomWords = [];

		for (let i = 0; i < numWords; i++) {
			randomWords.push(
				language[wordRange][
					(language[wordRange].length * Math.random()) | 0
				],
			);
		}

		for (let i = 0; i < numWords; i++) {
			array.push([]);

			for (let j = 0; j < randomWords[i].length; j++) {
				array[i].push({
					char: randomWords[i][j],
					error: false,
					hit: false,
					current: false,
				});

				if ($settings.modus === 'words') {
					charCount++;
				}
			}

			if (i + 1 !== numWords || $settings.modus === 'time') {
				array[i].push({
					char: ' ',
					error: false,
					hit: false,
					current: false,
				});

				if ($settings.modus === 'words') {
					charCount++;
				}
			}

			if (Math.random() < capitalize / 100) {
				array[i][0].char = array[i][0].char.toUpperCase();
			} else {
				array[i][0].char = array[i][0].char.toLowerCase();
			}

			if (start) {
				array[0][0].current = true;
			}
		}

		return array;
	}

	function getProgress(): void {
		if ($settings.modus === 'time') {
			progress = (stats.time.value / $settings.time) * 100;

			if ($settings.time === stats.time.value) {
				stats.time.stop = true;
			}
		} else if ($settings.modus === 'words') {
			progress = (stats.chars.value / charCount) * 100;

			let lastWord = words[words.length - 1];

			if (lastWord[lastWord.length - 1].hit) {
				stats.time.stop = true;
				charOffset -= currentChar[0].getBoundingClientRect().width;
				setOffset();
				lastWord[lastWord.length - 1].current = false;
			}
		}
	}

	async function reset(): Promise<void> {
		[charIdx, wordIdx, progress, charCount] = [0, 0, 0, 0];
		words = getRandomWords(wordCount, true);

		stats.time.value = 0;
		stats.time.stop = true;
		stats.chars.value = 0;
		stats.wpm.value = 0;
		stats.errors.value = 0;
		stats.errorRate.value = '0%';
		stats.lastKey.value = '';

		await tick();

		charOffset = currentChar[0].getBoundingClientRect().width / 2;
		setOffset();
	}

	$: if (!$upToDate) {
		$upToDate = true;
		reset();
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Tab') {
			e.preventDefault();
			reset();
		}

		if (e.key.length !== 1 || progress === 100) {
			return;
		}

		stats.time.stop = false;
		stats.lastKey.value = e.key;

		if (e.key === words[wordIdx][charIdx].char) {
			words[wordIdx][charIdx].hit = true;
			words[wordIdx][charIdx].current = false;

			stats.chars.value++;

			if (charIdx + 1 !== words[wordIdx].length) {
				charIdx++;
			} else if (wordIdx + 1 !== words.length) {
				wordIdx++;
				charIdx = 0;
			}

			words[wordIdx][charIdx].current = true;

			if (
				$settings.modus === 'time' &&
				words[Math.floor(words.length / 2)][0].current === true
			) {
				words = words.concat(getRandomWords(25, false));
			}
		} else {
			words[wordIdx].splice(charIdx, 0, {
				char: e.key,
				error: true,
				hit: false,
				current: false,
			});
			charIdx++;
			words = words;
			stats.errors.value++;
		}

		const errorRate = (stats.errors.value / stats.chars.value) * 100;
		stats.errorRate.value =
			errorRate >= 100
				? '100%'
				: !errorRate
				? '0%'
				: errorRate.toFixed(2) + '%';

		charOffset += currentChar[0].getBoundingClientRect().width;
		setOffset();
		getProgress();
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={setOffset} />

<section>
	<div class="typing-test-wrapper" bind:this={wrapperEl}>
		<div class="typing-test" bind:this={typingTestEl}>
			{#each words as word, wIdx (wIdx)}
				<p>
					{#each word as { char, hit, error, current }, cIdx (cIdx)}
						<span class:hit class:error class:current class="char">
							{#if char === ' '}
								&nbsp
							{:else}
								{char}
							{/if}
						</span>
					{/each}
				</p>
			{/each}
		</div>

		<div class="progress-bar">
			<div class="progress" style={`width: ${progress}%`} />
			<p>
				{#if !progress}
					0%
				{:else if progress === 100}
					100%
				{:else}
					{progress.toFixed(1)}%
				{/if}
			</p>
		</div>

		<div class="fade left" />
		<div class="fade right" />

		<input id="input" bind:this={inputEl} />
		<label for="input">input</label>
	</div>

	<div class="stats">
		{#each Object.values(stats) as { name, value }, sIdx (sIdx)}
			<Statistic {name} {value} />
		{/each}
	</div>

	<div class="tip" on:click={reset}>
		<key>tab</key>
		- restart test
	</div>
</section>

<style lang="scss">
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
			height: 124px;
			pointer-events: none;
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

			input {
				background: transparent;
				color: transparent;
				border: none;
				opacity: 0;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				pointer-events: auto;
				cursor: default;
			}

			label {
				opacity: 0;
				user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;
				color: transparent;
				z-index: -3;
			}

			.progress-bar {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 100%;
				height: 1px;
				background: var(--border);
				z-index: 2;

				.progress {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					background: var(--text);
				}

				p {
					position: absolute;
					bottom: 3px;
					left: 0;
					z-index: 2;
					font-size: 14px;

					@media screen and (max-width: 500px) {
						font-size: 12px;
					}
				}
			}

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				top: calc(50% + 20px);
				transform: translate(-50%, -50%);
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-bottom: 5px solid var(--text);
			}

			.fade {
				position: absolute;
				top: 0;
				height: 100%;
				width: 10%;
			}

			.left {
				left: 0;
				background: linear-gradient(to right, var(--bg), transparent);
				background: -webkit-linear-gradient(
					to right,
					var(--bg),
					transparent
				);
				background: -moz-linear-gradient(
					to right,
					var(--bg),
					transparent
				);
			}

			.right {
				right: 0;
				background: linear-gradient(to left, var(--bg), transparent);
				background: -webkit-linear-gradient(
					to left,
					var(--bg),
					transparent
				);
				background: -moz-linear-gradient(
					to left,
					var(--bg),
					transparent
				);
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
					background: rgba(var(--error-text), 0.1);
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

		.tip {
			position: fixed;
			bottom: 80px;
			font-size: 15px;
			cursor: pointer;
			user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;

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
