<script lang="ts">
	import { fromStore } from 'svelte/store'
	import type { Writable } from 'svelte/store'
	import ListInputStyle from './ListInputStyle.svelte'
	import type { FinancialNumber } from 'financial-number'

	const { store }: { store: Writable<FinancialNumber> } = $props()
	const store_value = fromStore(store)
</script>

<ListInputStyle>
	<div class="input-style handles-own-background">
		{#if store_value.current !== null}
			{store_value.current.toString()}
		{/if}
	</div>
</ListInputStyle>

<style>
	div {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: right;
		font-variant-numeric: tabular-nums;
		width: 100%;
		margin: 0;
		padding: 0;
		background-color: rgb(var(--black_rbg), 0.1);
	}
</style>
