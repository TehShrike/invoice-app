<script lang="ts">
	import Card from 'shared/Card.svelte'
	import Column from 'shared/Column.svelte'
	import ContentWidth from 'shared/ContentWidth.svelte'

	import CreateInvoice from './CreateInvoice.svelte'
	import DisplayInvoice from './DisplayInvoice.svelte'

	import type { RowStore } from 'shared/list-input/ListInput.svelte'

	import type { NameAndAddress, LineItem } from './invoice_types'

	let row_stores: RowStore[]
	let bill_to: NameAndAddress
	let seller: NameAndAddress

	$: line_items = row_stores
		? row_stores.map(row => row.store_of_values.get()) as LineItem[]
		: []
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
		<CreateInvoice
			bind:row_stores
			bind:seller
			bind:bill_to
		/>
	</Card>

	<Card>
		<h2>Printable invoice</h2>
		{#if seller && bill_to && line_items}
			<DisplayInvoice
				invoice={{
					seller,
					bill_to,
					line_items,
				}}
			/>
		{/if}
	</Card>
</Column>

<style>
	:root {
		--input-text-color: var(--black);
		--mid-gray: #888787;
	}
</style>
