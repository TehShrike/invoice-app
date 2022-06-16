<div>
	<slot></slot>
</div>

<style>
	div {
		background-color: var(--white);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 16px;
		gap: var(--base-content-gap);
		border: 1px solid rgba(var(--black_rbg), 0.3);
		border-radius: 4px;
	}

	@media(max-width: 700px) {
		div {
			padding: 8px;
		}
	}
</style>
