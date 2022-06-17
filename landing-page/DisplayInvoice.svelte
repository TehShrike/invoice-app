<script lang=ts>
	import type { Invoice } from './invoice_types'

	export let invoice: Invoice
</script>

<p>{invoice.seller.name}</p>
<p>{invoice.bill_to.name}</p>
