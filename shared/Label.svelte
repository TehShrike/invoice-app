<script lang="ts">
	import type { Snippet } from 'svelte'
	const { children }: { children: Snippet } = $props()
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<label>
	{@render children()}
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		color: var(--blue);
		font-weight: 500;
	}
</style>
