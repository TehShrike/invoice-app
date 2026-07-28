<script lang="ts">
	import number from 'financial-number'
	import { fromStore } from 'svelte/store'

	import Card from 'shared/Card.svelte'
	import Column from 'shared/Column.svelte'
	import ContentWidth from 'shared/ContentWidth.svelte'

	import CreateInvoice from './CreateInvoice.svelte'
	import DisplayInvoice from './DisplayInvoice.svelte'

	import type { RowStore } from 'shared/list-input/ListInput.svelte'

	import type { NameAndAddress, Invoice, LineItem, Iso8601Date } from './invoice_types.ts'
	import make_localstorage_store from './localstorage_store.ts'

	let row_stores: RowStore[] = $state([])
	let bill_to: NameAndAddress = $state(undefined as any)
	let seller: NameAndAddress = $state(undefined as any)

	const default_invoice: Invoice = {
		number: 1001,
		invoice_date: `2022-06-22`,
		seller: {
			name: `Cool Person`,
			email: `me@example.com`,
			address: null,
			phone: null,
		},
		bill_to: {
			name: ``,
			address: null,
			phone: `123-456-7890`,
			email: null,
		},
		line_items: [{
			description: `Totally sweet item`,
			quantity: number(`2`),
			price: number(`12.99`),
			total: number(`25.98`),
		}]
	}

	const invoice_store = make_localstorage_store(`invoice`, default_invoice)
	const invoice_store_value = fromStore(invoice_store)

	let line_items = $derived(
		row_stores
			? row_stores.map(row => row.store_of_values.get()) as LineItem[]
			: []
	)

	let invoice_number: number = $state(0)
	let invoice_date: Iso8601Date = $state(`` as Iso8601Date)

	$effect(() => {
		if (seller && bill_to && line_items) {
			invoice_store.set({
				number: invoice_number,
				invoice_date,
				seller,
				bill_to,
				line_items,
			})
		}
	})
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
			initial_invoice_state={invoice_store_value.current}
			bind:invoice_number
			bind:invoice_date
			bind:row_stores
			bind:seller
			bind:bill_to
		/>
	</Card>

	<Card>
		<h2>Printable invoice</h2>
		{#if seller && bill_to && line_items}
			<DisplayInvoice
				invoice={invoice_store_value.current}
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
