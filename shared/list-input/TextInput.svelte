<script lang=ts>
	import type { Writable } from 'svelte/store'
	import InputStyle from './InputStyle.svelte'

	export let disabled = false

	export let store: Writable<string>

	let input_element: HTMLInputElement

	export const set_focus = () => {
		input_element.focus()
	}
	const on_focus = () => {
		input_element.select()
	}
</script>

<InputStyle>
	<input
		type=text
		bind:value={$store}
		disabled={disabled}
		bind:this={input_element}
		on:focus
		on:focus={on_focus}
		on:blur
	/>
</InputStyle>
