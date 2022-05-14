<script lang=ts>
	import type { Writable } from 'svelte/store'
	import InputStyle from './InputStyle.svelte'
	import type { FinancialNumber } from 'financial-number'

	export let store: Writable<FinancialNumber>
</script>

<InputStyle>
	<div class="input-style handles-own-background">
		{#if $store !== null}
			{$store.toString()}
		{/if}
	</div>
</InputStyle>

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
