<script lang=ts>
	import type { Invoice } from './invoice_types'

	export let invoice: Invoice
</script>

<div class=invoice>
	<p>{invoice.seller.name}</p>
	<p>{invoice.bill_to.name}</p>
</div>

<style>
	.invoice {
		background-color: var(--white);
	}
</style>
