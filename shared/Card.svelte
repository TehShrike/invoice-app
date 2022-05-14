<div>
	<slot></slot>
</div>

<style>
	div {
		background-color: var(--white);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 32px;
		gap: var(--base-content-gap);

		box-shadow: 1px 1px 4px 1px rgba(var(--black_rbg), 0.3),
			0px 0px 8px 8px rgba(var(--black_rbg), 0.05);
	}

	@media(max-width: 700px) {
		div {
			padding: 16px;
		}
	}
</style>
