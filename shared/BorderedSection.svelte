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
		gap: var(--base_content_gap);
		border: 2px solid var(--dark);
		border-radius: 4px;
	}

	@media(max-width: 700px) {
		div {
			padding: 8px;
		}
	}
</style>
