<span>
	<slot></slot>
</span>

<style>
	span :global(.input-style), span :global(input) {
		box-sizing: border-box;
		margin: 0;
		padding: 4px 8px;
		border: 1px solid var(--input-outline-color);
		border-radius: 3px;
		width: 100%;
		font-size: 16px;

		color: var(--input-text-color);
	}

	span :global(.input-style:disabled), span :global(input:disabled) {
		color: var(--mid-gray);
	}


	span :global(.input-style:focus), span :global(input:focus) {
		outline: none;
		background-color: var(--focus-background-color);
		-webkit-box-shadow: 0 0 0 3px var(--focus-border-color);
		box-shadow: 0 0 0 3px var(--focus-border-color);
		border-color: var(--focus-border-color);
	}

</style>
