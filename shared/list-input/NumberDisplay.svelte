<script>
	import InputStyle from './InputStyle.svelte'

	export let store
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
		background-color: #f2f2f2;
	}
</style>
