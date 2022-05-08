<script>
	import { createEventDispatcher } from 'svelte'

	import { computed as warg_computed, value as warg_value } from 'warg'

	const dispatch = createEventDispatcher()

	export let columns
	export let rows
	export let external_stores
	export let empty_row_factory
	export let row_is_empty_predicate

	$: grid_template_columns = columns.map(
		({ initial_fraction = 1, width }) => width ? width : `${initial_fraction}fr`,
	).join(` `)

	let row_key = 0
	const row_to_stores = row => {
		const value_stores = Object.fromEntries(
			columns
				.filter(({ computed }) => !computed)
				.map(({ property }) => {
					const value = property in row
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

		columns.filter(({ computed }) => computed)
			.forEach(({ property, computed }) => {
				object_of_stores[property] = warg_computed(object_of_stores, computed)
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

	const make_store_that_updates_when_array_contents_change = row_stores => {
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
		const should_be_removed = ({ key, store_of_values }, index) => index !== row_stores.length - 1
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

	const focus_functions = {}

	const on_keypress = (event, row_key, column_index) => {
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

	let current_focused_row_key = null

	const on_focus = row_key => {
		current_focused_row_key = row_key
	}
	
	const on_blur = row_key => {
		if (row_key === current_focused_row_key) {
			current_focused_row_key = null
		}
		setTimeout(clean_up_empty_rows_and_ensure_final_is_empty, 0)
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
				<div 
					role=cell 
					on:keypress={event => on_keypress(event, key, column_index)}
					style="--input-text-color: {row_index === row_stores.length - 1 ? `var(--mid-gray)` : `var(--black)`};"
				>
					<svelte:component
						this={column.component}
						store={object_of_stores[column.property]}
						bind:set_focus={focus_functions[`${key}-${column_index}`]}
						on:focus={() => on_focus(key)}
						on:blur={() => on_blur(key)}
						on:column_event={({ detail: { event, ...rest } }) => dispatch(event, {
							index: row_index,
							row_key: key,
							row_store: object_of_stores[column.property],
							...rest,
						})}
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

		--mid-gray: #888787;
		--cell-outline-color: var(--mid-gray);
		--focus-border-color: #6a6862;
		--focus-background-color: floralwhite;
		--black: #333;
	}

	[role=row] {
		display: grid;
		gap: 1px;
	}

	[role=columnheader] {
		display: grid;
		font-weight: 500;

		padding: 8px;
	}

	[role=cell], [role=columnheader] {
		box-sizing: border-box;
		outline: 1px solid var(--cell-outline-color);

		overflow: hidden;
	}

	[role=cell]:focus-within {
		border-radius: 2px;
		-webkit-box-shadow: 0 0 0 2px var(--focus-border-color);
		box-shadow: 0 0 0 2px var(--focus-border-color);
		z-index: 1;
	}

	[data-header-text-align=center] {
		text-align: center;
	}
	[data-header-text-align=right] {
		text-align: right;
	}
</style>
