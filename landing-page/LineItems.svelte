<script>
	import NumberInput from './inputs/NumberInput.svelte'
	import Checkbox from './inputs/Checkbox.svelte'
	import NumberDisplay from './inputs/NumberDisplay.svelte'
	import TextArea from './inputs/TextArea.svelte'
	import DeleteButton from './inputs/DeleteButton.svelte'

	import ListInput from './ListInput.svelte'

	import number from 'financial-number'
	import { value } from 'warg'

	const zero = number(`0`)

	const external_stores = {
		tax_rate: value(number(`0.075`)),
	}

	const columns = [{
		name: `Taxable`,
		property: `taxable`,
		component: Checkbox,
		initial_fraction: 1,
	}, {
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
		name: `Tax`,
		property: `tax`,
		component: NumberDisplay,
		initial_fraction: 2,
		header_text_align: `right`,
		computed: ({ taxable, quantity, price, tax_rate }) => (taxable
			? quantity.times(price).times(tax_rate)
			: zero
		).changePrecision(2),
	}, {
		name: `Total`,
		property: `total`,
		component: NumberDisplay,
		initial_fraction: 2.5,
		header_text_align: `right`,
		computed: ({ quantity, price, tax }) => quantity.times(price).plus(tax).changePrecision(2),
	}, {
		name: ``,
		component: DeleteButton,
		width: `24px`,
	}]

	const empty_row_factory = () => ({
		quantity: number(`1`),
		description: ``,
		taxable: true,
		price: number(`0.00`),
	})

	const row_is_empty_predicate = row => row.quantity.equal(`1`)
		&& row.description === ``
		&& row.taxable === true
		&& row.price.equal(`0.00`)

	let items = [{
		quantity: number(`2`),
		description: `Pants.  This is a line that will grow.  How much will it grow?  Well, potentially quite a bit.`,
		taxable: true,
		price: number(`20000.01`),
	}, {
		quantity: number(`1`),
		description: `Sock`,
		taxable: true,
		price: number(`3.99`),
	}, {
		quantity: number(`1`),
		description: `Chocolate bar`,
		taxable: false,
		price: number(`1.29`),
	}]

	$: total_calculated_from_rows = items.reduce(
		(invoice_total, { total }) => invoice_total.plus(total ? total : zero), zero,
	)

	let row_stores

	const on_delete = ({ detail: { index: index_to_delete } }) => {
		row_stores = row_stores.filter((_, index) => index !== index_to_delete)
	}
</script>

<div class="container">
	<label>
		Tax rate
		<NumberInput
			bind:store={external_stores.tax_rate}
			precision={3}
			min={0}
			style="max-width: 200px; border: 1px solid black"
		/>
	</label>

	<ListInput
		{columns}
		bind:rows={items}
		bind:row_stores
		{external_stores}
		{empty_row_factory}
		{row_is_empty_predicate}
		on:delete={on_delete}
	/>

	<div style="display: flex; justify-content: flex-end; gap: 8px;">
		<strong>Calculated total:</strong>
		<output>{total_calculated_from_rows.toString()}</output>
	</div>
</div>



<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
