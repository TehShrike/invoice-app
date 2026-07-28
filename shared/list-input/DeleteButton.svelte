<script lang="ts">
	import { fromStore } from 'svelte/store'
	import type { Writable } from 'svelte/store'

	let {
		store,
		set_focus = $bindable(),
		onfocus,
		onblur,
		on_column_event,
	}: {
		store: Writable<boolean>,
		set_focus?: () => void,
		onfocus?: () => void,
		onblur?: () => void,
		on_column_event?: (detail: { event: string }) => void,
	} = $props()

	const store_value = fromStore(store)

	let input_element: HTMLButtonElement

	set_focus = () => input_element.focus()

	const on_click = () => {
		on_column_event?.({
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
		class="input-style"
		bind:this={input_element}
		onclick={on_click}
		onfocus={onfocus}
		onblur={onblur}
		onkeypress={on_keypress}
		disabled={!store_value.current}
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
