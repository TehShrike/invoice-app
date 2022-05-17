<script lang="ts">
	import number from 'financial-number'
	import type { FinancialNumber } from 'financial-number'

	import NumberInput from 'shared/list-input/NumberInput.svelte'
	import Checkbox from 'shared/list-input/Checkbox.svelte'
	import NumberDisplay from 'shared/list-input/NumberDisplay.svelte'
	import TextArea from 'shared/list-input/TextArea.svelte'
	import DeleteButton from 'shared/list-input/DeleteButton.svelte'

	import ListInput from 'shared/list-input/ListInput.svelte'
	import type { Column, AnyRow } from 'shared/list-input/ListInput.svelte'

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
</script>

<ListInput
	columns={columns_type_cast}
	{empty_row_factory}
	row_is_empty_predicate={row_is_empty_predicate_type_cast}
/>
