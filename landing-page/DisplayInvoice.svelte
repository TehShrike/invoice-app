<script lang="ts">
	import type { Invoice } from './invoice_types.ts'

	let { invoice }: { invoice: Invoice } = $props()
</script>

<div class="invoice">
	<p>{invoice.seller.name}</p>
	<p>{invoice.bill_to.name}</p>
</div>

<style>
	.invoice {
		background-color: var(--white);
	}
</style>
