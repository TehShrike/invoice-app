<script context=module lang=ts>
	import type { SvelteComponent } from 'svelte'

	export type AnyRow = {
		[key: string]: any
	}

	export type Column<Row> = {
		name: string,
		property?: string,
		component: typeof SvelteComponent,
		header_text_align?: `right` | `left`
		initial_fraction?: number,
		width?: string,
		computed?: (row: Row) => any,
		props?: {
			[key: string]: any
		}
	}

	export type RowStore ={
		object_of_stores: {
			[key: string]: WargObservable<any>
		},
		store_of_values: WargObservable<{
			[key: string]: any
		}>,
		key: number
	}

	export type ColumnEvent = {
		index: number,
		row_key: number,
		row_store: RowStore
	}
</script>

<script lang=ts>
	import { createEventDispatcher } from 'svelte'
	import type { BasicObservable, WargObservable } from 'warg'

	import { computed as warg_computed, value as warg_value } from 'warg'

	const dispatch = createEventDispatcher()

	export let columns: Array<Column<AnyRow>>
	export let rows: Array<AnyRow> = []
	export let external_stores: {
		[key: string]: BasicObservable<any>
	} = {}
	export let empty_row_factory: () => { [key: string] : any }
	export let row_is_empty_predicate: (row: AnyRow) => boolean

	$: grid_template_columns = columns.map(
		({ initial_fraction = 1, width }) => width ? width : `${initial_fraction}fr`,
	).join(` `)

	let row_key = 0
	const row_to_stores = (row: AnyRow) => {
		const value_stores = Object.fromEntries(
			columns
				.filter(({ computed }) => !computed)
				.map(({ property }) => {
					const value = property && property in row
						? warg_value(row[property])
						: warg_value(null)

					return [
						property,
						value,
					]
				}),
		)

		const object_of_stores = {
			...value_stores,
			...external_stores,
		}

		columns
			.forEach(({ property, computed }) => {
				if (property && computed) {
					object_of_stores[property] = warg_computed(object_of_stores, computed)
				}
			})

		const store_of_values = warg_computed(object_of_stores, all_values => all_values)

		return {
			object_of_stores,
			store_of_values,
			key: row_key++,
		}
	}

	// row_stores is the canonical array that should be written to when state needs to change
	export let row_stores = rows.map(row_to_stores)

	const make_store_that_updates_when_array_contents_change = (row_stores: Array<ReturnType<typeof row_to_stores>>) => {
		const index_to_values_object = Object.fromEntries(row_stores.map(
			({ store_of_values }, index) => [ index, store_of_values ],
		))
	
		return warg_computed(
			// this could theoretically come out in a different order than the original array?  meh
			index_to_values_object,
			rows_object => Object.values(rows_object),
		)
	}

	const update_rows_property = () => {
		rows = row_stores
			.map(({ store_of_values }) => store_of_values.get())
			.filter(row => !row_is_empty_predicate(row))
	}

	const clean_up_empty_rows_and_ensure_final_is_empty = () => {
		type KeyAndStoreOfValues = { key: number, store_of_values: BasicObservable<AnyRow> }
		const should_be_removed = ({ key, store_of_values }: KeyAndStoreOfValues, index: number) => index !== row_stores.length - 1
				&& key !== current_focused_row_key
				&& row_is_empty_predicate(store_of_values.get())

		let cleaned_up = row_stores.filter(
			(row, index) => !should_be_removed(row, index),
		)

		let changed = cleaned_up.length !== row_stores.length

		let last_row_is_empty = cleaned_up.length > 0
			&& row_is_empty_predicate(cleaned_up[cleaned_up.length - 1].store_of_values.get())

	
		if (!last_row_is_empty) {
			cleaned_up.push(row_to_stores(empty_row_factory()))
			changed = true
		}

		if (changed) {
			row_stores = cleaned_up
			row_contents_store = make_store_that_updates_when_array_contents_change(row_stores)
		}
	}

	$: row_contents_store = make_store_that_updates_when_array_contents_change(row_stores)
	$: $row_contents_store && row_stores && clean_up_empty_rows_and_ensure_final_is_empty()
	$: $row_contents_store && row_stores && update_rows_property()

	const focus_functions: {[key: string]: () => {}} = {}

	const on_keypress = (event: KeyboardEvent, row_key: number, column_index: number) => {
		if (event.key === `Enter`) {
			const row_index = row_stores.findIndex(({ key }) => key === row_key)
			const target_row_index = row_index + (event.shiftKey ? -1 : 1)
			if (row_stores[target_row_index]) {
				const target_row_key = row_stores[target_row_index].key
				const target_focus_function = focus_functions[`${target_row_key}-${column_index}`]
				target_focus_function()
			}
		}
	}

	let current_focused_row_key: null | number = null

	const on_focus = (row_key: number) => {
		current_focused_row_key = row_key
	}
	
	const on_blur = (row_key: number) => {
		if (row_key === current_focused_row_key) {
			current_focused_row_key = null
		}
		setTimeout(clean_up_empty_rows_and_ensure_final_is_empty, 0)
	}

	const dispatch_column_event = (event_name: string, column_information: ColumnEvent, event_details = {}) => {
		dispatch(event_name, {
			...column_information,
			...event_details,
		})
	}
</script>

<div role=table>
	<div style="grid-template-columns: {grid_template_columns};" role=row>
		{#each columns as column}
			<div data-header-text-align={column.header_text_align} role=columnheader>
				{column.name}
			</div>
		{/each}			
	</div>

	{#each row_stores as { object_of_stores, key }, row_index (key)}
		<div style="grid-template-columns: {grid_template_columns};" role=row>
			{#each columns as column, column_index}
				{@const row_store = column.property && object_of_stores[column.property]}
				<div 
					role=cell 
					on:keypress={event => on_keypress(event, key, column_index)}
					style="--input-text-color: {row_index === row_stores.length - 1 ? `var(--mid-gray)` : `var(--black)`};"
				>
					<svelte:component
						this={column.component}
						store={row_store}
						bind:set_focus={focus_functions[`${key}-${column_index}`]}
						on:focus={() => on_focus(key)}
						on:blur={() => on_blur(key)}
						on:column_event={({ detail: { event, ...rest } }) => dispatch_column_event(event, {
							index: row_index,
							row_key: key,
							row_store,
						}, rest)}
						{...column.props}
					/>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	[role=table] {
		display: grid;
		gap: 1px;

		--cell-outline-color: var(--black);
	}

	[role=row] {
		display: grid;
		gap: 1px;
	}

	[role=columnheader] {
		display: grid;
		font-weight: 500;
		font-size: 18px;

		padding: 8px;
	}

	[role=cell], [role=columnheader] {
		box-sizing: border-box;
		outline: 1px solid var(--cell-outline-color);

		overflow: hidden;
	}

	[role=cell]:focus-within {
		border-radius: 3px;
		-webkit-box-shadow: 0 0 0 3px var(--focus_border_color);
		box-shadow: 0 0 0 3px var(--focus_border_color);
		outline-color: var(--focus_border_color);
		z-index: 1;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
