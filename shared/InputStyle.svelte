<span>
	<slot></slot>
</span>

<style>
	span :global(.input-style), span :global(input) {
		box-sizing: border-box;
		margin: 0;
		padding: 4px 8px;
		border: 1px solid var(--input_outline_color);
		border-radius: 3px;
		width: 100%;
		font-size: 16px;

		background-color: var(--white);
		color: var(--input-text-color);
	}

	span :global(.input-style:disabled), span :global(input:disabled) {
		color: var(--mid-gray);
	}


	span :global(.input-style:focus), span :global(input:focus) {
		outline: none;
		background-color: var(--focus_background_color);
		-webkit-box-shadow: 0 0 0 3px var(--focus_border_color);
		box-shadow: 0 0 0 3px var(--focus_border_color);
		border-color: var(--focus_border_color);
	}

</style>
