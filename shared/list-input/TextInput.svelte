<script lang="ts">
	import { fromStore } from 'svelte/store'
	import type { Writable } from 'svelte/store'
	import ListInputStyle from './ListInputStyle.svelte'

	let {
		disabled = false,
		store,
		set_focus = $bindable(),
		onfocus,
		onblur,
	}: {
		disabled?: boolean,
		store: Writable<string>,
		set_focus?: () => void,
		onfocus?: () => void,
		onblur?: () => void,
	} = $props()

	const store_value = fromStore(store)

	let input_element: HTMLInputElement

	set_focus = () => {
		input_element.focus()
	}
	const on_focus = () => {
		input_element.select()
		onfocus?.()
	}
</script>

<ListInputStyle>
	<input
		type="text"
		value={store_value.current}
		oninput={e => store.set(e.currentTarget.value)}
		{disabled}
		bind:this={input_element}
		onfocus={on_focus}
		onblur={onblur}
	/>
</ListInputStyle>
