<script lang="ts">
	import number from 'financial-number'
	import type { FinancialNumber } from 'financial-number'

	import NumberInput from 'shared/list-input/NumberInput.svelte'
	import NumberDisplay from 'shared/list-input/NumberDisplay.svelte'
	import TextArea from 'shared/list-input/TextArea.svelte'
	import DeleteButton from 'shared/list-input/DeleteButton.svelte'

	import ListInput from 'shared/list-input/ListInput.svelte'
	import type { Column, AnyRow } from 'shared/list-input/ListInput.svelte'

	import BillToInputs from 'shared/BillToInputs.svelte'
	import type { Details } from 'shared/BillToInputs.svelte'
	import Label from 'shared/Label.svelte'
	import InputStyle from 'shared/InputStyle.svelte'
	import { js_date_to_iso_date_string } from 'shared/date'

	type Row = {
		description: string,
		quantity: FinancialNumber,
		price: FinancialNumber,
		total: FinancialNumber
	}

	const columns: Column<Row>[] = [{
		name: `Description`,
		property: `description`,
		component: TextArea,
		initial_fraction: 6,
	}, {
		name: `Quantity`,
		property: `quantity`,
		component: NumberInput,
		initial_fraction: 2,
		header_text_align: `right`,
		props: {
			min: null,
			precision: 0,
		},
	}, {
		name: `Price`,
		property: `price`,
		component: NumberInput,
		initial_fraction: 3,
		header_text_align: `right`,
		props: {
			min: null,
			precision: 2,
		},
	}, {
		name: `Line Total`,
		property: `total`,
		component: NumberDisplay,
		initial_fraction: 2.5,
		header_text_align: `right`,
		computed: ({ quantity, price }: { quantity: FinancialNumber, price: FinancialNumber }) => quantity.times(price).changePrecision(2),
	}, {
		name: ``,
		component: DeleteButton,
		width: `24px`,
	}]

	const empty_row_factory = () => ({
		quantity: number(`1`),
		description: ``,
		price: number(`0.00`),
	})

	const row_is_empty_predicate = (row: ReturnType<typeof empty_row_factory>) => row.quantity.equal(`1`)
		&& row.description === ``
		&& row.price.equal(`0.00`)

	const columns_type_cast = columns as Column<AnyRow>[]
	const row_is_empty_predicate_type_cast = row_is_empty_predicate as (row: AnyRow) => boolean

	let bill_to = {
		name: ``,
	}
	let invoice_number = 1001
	let invoice_date = js_date_to_iso_date_string(new Date())

	let bill_to_details: Details = []
</script>

<!--
Your company name/email/phone/address

"Bill to" company name
- email/phone/address

Invoice number
Invoice date

Lineitems

if taxed: Subtotal
Total

Paid?
Amount due?
-->
<div class="document_grid">
	<span style="max-width: 250px">
		<h3 class=accent-bottom>Bill to</h3>
		<BillToInputs bind:details={bill_to_details} />
	</span>

	<span>
		<Label>
			Invoice #
			<InputStyle>
				<input type="number" bind:value={invoice_number}>
			</InputStyle>
		</Label>
		<Label>
			Date
			<InputStyle>
				<input type="date" bind:value={invoice_date} style="font-family: sans-serif;">
			</InputStyle>
		</Label>
	</span>
</div>

<ListInput
	columns={columns_type_cast}
	{empty_row_factory}
	row_is_empty_predicate={row_is_empty_predicate_type_cast}
/>

<style>
	.document_grid {
		display: grid;
		grid-template-columns: 1fr  240px;
	}

	.accent-bottom {
		border-bottom: solid var(--light_blue) 2px;
	}
</style>
