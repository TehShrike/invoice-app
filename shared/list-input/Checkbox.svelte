<script>
	export let store

	let input_element

	export const set_focus = () => input_element.focus()

	const on_cell_click = () => {
		$store = !$store
		focus()
	}
</script>

<div class="checkbox-wrapper" on:click={on_cell_click}>
	<input 
		type=checkbox 
		bind:checked={$store} 
		bind:this={input_element}
		on:focus
		on:blur
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
		background-color: var(--focus-background-color);
	}

	input {
		transform: scale(1.5);
		margin: 0;
		outline: none;
	}
</style>
