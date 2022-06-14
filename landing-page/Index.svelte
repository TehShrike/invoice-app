<script lang="ts">
	import CreateInvoice from './CreateInvoice.svelte'
	import Card from 'shared/Card.svelte'
	import Column from 'shared/Column.svelte'
	import ContentWidth from 'shared/ContentWidth.svelte'

</script>

<Column>
	<ContentWidth>
		<h1>Banner Invoice</h1>
		<p>
			Create an invoice for free and print it or save it as a PDF right now without entering your email address.
		</p>
		<p>
			Enter the invoice details quickly using only the keyboard (press Tab to go to the next field).  Busywork like creating invoices should be easy and over with quickly.
		</p>
	</ContentWidth>

	<Card>
		<CreateInvoice />
	</Card>
</Column>

<style>
	:root {
		--input-text-color: var(--black);
		--mid-gray: #888787;
	}
</style>
