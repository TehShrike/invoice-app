<script lang=ts>
	import type { Writable } from 'svelte/store'
	import ListInputStyle from './ListInputStyle.svelte'

	export let disabled = false

	export let store: Writable<string>

	let input_element: HTMLTextAreaElement

	export const set_focus = () => {
		input_element.focus()
	}
	const on_focus = () => {
		input_element.select()
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
		data-replicated-value={$store}
	>
		<textarea
			rows=1
			class=input-style
			bind:value={$store}
			{disabled}
			bind:this={input_element}
			on:focus
			on:focus={on_focus}
			on:blur
			on:keypress={on_keypress}
		/>		
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
