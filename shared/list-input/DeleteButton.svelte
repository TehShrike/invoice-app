<script lang=ts>
	import { createEventDispatcher } from 'svelte'
	import type { Writable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	export let store: Writable<boolean>

	let input_element: HTMLButtonElement

	export const set_focus = () => input_element.focus()

	const on_click = () => {
		dispatch(`column_event`, {
			event: `delete`,
		})
	}

	const on_keypress = (event: KeyboardEvent) => {
		if (event.key === `Enter`) {
			event.preventDefault()
		}
	}
</script>

<div class="button-wrapper">
	<button
		class=input-style
		bind:this={input_element}
		on:click={on_click}
		on:focus
		on:blur
		on:keypress={on_keypress}
		disabled={!$store}
	>
		❌
	</button>
</div>

<style>
	.button-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-wrapper:focus-within {
		background-color: var(--focus_background_color);
	}

	button {
		border: none;
		background: transparent;
		outline: none;
	}

	button :global(svg) {
		fill: var(--red);
	}

	button[disabled] :global(svg) {
		fill: var(--beige);
	}
</style>
