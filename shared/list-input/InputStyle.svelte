<div>
	<slot></slot>
</div>

<style>
	div {
		min-height: 100%;
		display: flex;
	}

	div:focus-within {
		background-color: var(--focus-background-color);
	}

	div :global(.input-style), div :global(input) {
		box-sizing: border-box;
		margin: 0;
		padding: 4px 8px;
		border: none;
		border-radius: 0;
		width: 100%;
		font-size: 16px;
		
		color: var(--input-text-color);
	}

	div :global(.input-style:not(.handles-own-background)),
	div :global(input:not(.handles-own-background)),
	div :global(.input-style:disabled:not(.handles-own-background)),
	div :global(input:disabled:not(.handles-own-background)) {
		background-color: transparent;
	}

	div :global(.input-style:disabled), div :global(input:disabled) {
		color: gray;
	}


	div :global(.input-style:focus), div :global(input:focus) {
		outline: none;
	}
</style>
