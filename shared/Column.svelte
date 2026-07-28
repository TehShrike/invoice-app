<script lang="ts">
	import type { Snippet } from 'svelte'
	const { children }: { children: Snippet } = $props()
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
		gap: 16px;
	}
</style>
