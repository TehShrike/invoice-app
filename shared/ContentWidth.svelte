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
		gap: var(--base_content_gap);
		max-width: 700px;
	}
</style>
