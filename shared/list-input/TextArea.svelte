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

	let input_element: HTMLTextAreaElement

	set_focus = () => {
		input_element.focus()
	}
	const on_focus = () => {
		input_element.select()
		onfocus?.()
	}
	const on_keypress = (event: KeyboardEvent) => {
		if (event.key === `Enter`) {
			event.preventDefault()
		}
	}
</script>

<ListInputStyle>
	<div
		class="grow-wrap"
		data-replicated-value={store_value.current}
	>
		<textarea
			rows={1}
			class="input-style"
			value={store_value.current}
			oninput={e => store.set(e.currentTarget.value)}
			{disabled}
			bind:this={input_element}
			onfocus={on_focus}
			onblur={onblur}
			onkeypress={on_keypress}
		></textarea>
	</div>
</ListInputStyle>

<style>
	/* cribbed from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
	.grow-wrap {
		display: grid;
		width: 100%;
	}
	.grow-wrap::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) " ";

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	textarea {
		resize: none;
		overflow: hidden;
	}
	textarea,
	.grow-wrap::after {
		/* Identical styling required!! */
		padding: 4px 8px;

		font: inherit;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}
</style>
