<script lang="ts">
	import number from 'financial-number'

	import Card from 'shared/Card.svelte'
	import Column from 'shared/Column.svelte'
	import ContentWidth from 'shared/ContentWidth.svelte'

	import CreateInvoice from './CreateInvoice.svelte'
	import DisplayInvoice from './DisplayInvoice.svelte'

	import type { RowStore } from 'shared/list-input/ListInput.svelte'
	import { js_date_to_iso_date_string } from 'shared/date'

	import type { NameAndAddress, Invoice, LineItem } from './invoice_types'
	// import make_localstorage_store from './localstorage_store'

	let row_stores: RowStore[]
	let bill_to: NameAndAddress
	let seller: NameAndAddress

	// const invoice_store = make_localstorage_store('invoice', default invoice here)

	const default_invoice: Invoice = {
		number: 1001,
		invoice_date: js_date_to_iso_date_string(new Date()),
		seller: {
			name: `Cool Person`,
			email: `me@example.com`,
			address: null,
			phone: null,
		},
		bill_to: {
			name: ``,
			address: null,
			phone: null,
			email: null,
		},
		line_items: [{
			description: `Totally sweet item`,
			quantity: number(`2`),
			price: number(`12.99`),
			total: number(`25.98`),
		}]
	}

	$: line_items = row_stores
		? row_stores.map(row => row.store_of_values.get()) as LineItem[]
		: []

	$: invoice = {
		seller,
		bill_to,
		line_items,
	}
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
				{invoice}
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
