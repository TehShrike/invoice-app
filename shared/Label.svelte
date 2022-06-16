<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<slot></slot>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		color: var(--blue);
		font-weight: 500;
	}
</style>
