<script lang="ts">
	import { fromStore } from 'svelte/store'
	import type { Writable } from 'svelte/store'

	let {
		store,
		set_focus = $bindable(),
		onfocus,
		onblur,
	}: {
		store: Writable<boolean>,
		set_focus?: () => void,
		onfocus?: () => void,
		onblur?: () => void,
	} = $props()

	const store_value = fromStore(store)

	let input_element: HTMLInputElement

	set_focus = () => input_element.focus()

	const on_cell_click = () => {
		store.set(!store_value.current)
		input_element.focus()
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="checkbox-wrapper" onclick={on_cell_click}>
	<input
		type="checkbox"
		checked={store_value.current}
		oninput={() => store.set(!store_value.current)}
		bind:this={input_element}
		onfocus={onfocus}
		onblur={onblur}
	/>
</div>

<style>
	.checkbox-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checkbox-wrapper:focus-within {
		background-color: var(--focus_background_color);
	}

	input {
		transform: scale(1.5);
		margin: 0;
		outline: none;
	}
</style>
