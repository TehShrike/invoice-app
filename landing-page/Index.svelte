<script lang="ts">
	import CreateInvoice from './CreateInvoice.svelte'
	import Card from 'shared/Card.svelte'
	import Column from 'shared/Column.svelte'

</script>

<Column>
	<h1>Banner Invoice</h1>
	<p>
		Create an invoice for free and print it or save it as a PDF right now without entering your email address.
	</p>
	<p>
		Enter the invoice details quickly using only the keyboard (press Tab to go to the next field).  Busywork like creating invoices should be easy and over with quickly.
	</p>

	<Card>
		<CreateInvoice />
	</Card>
</Column>
