<script lang=ts context=module>
	export type Detail = {
		current_type: InputTypes,
		value: string
	}

	export type Details = Detail[]
</script>

<script lang=ts>
	import BillToInput from 'shared/BillToInput.svelte'
	import type { InputTypes } from 'shared/BillToInput.svelte'

	export let current_details: Details = []

	type DisplayDetail = Omit<Detail, `current_type`> & {
		current_type: InputTypes | null,
	}

	const make_empty_value = () => ({
		current_type: null,
		value: ``
	})

	let display_details: DisplayDetail[] = [ make_empty_value() ]

	const all_possible_types: InputTypes[] = [ `email`, `phone`, `address` ]

	const is_valid_detail = (detail: DisplayDetail): detail is Detail => detail.current_type !== null

	const get_allowed_types = (previous_details: DisplayDetail[]) => {
		const types_used_already = new Set(
			previous_details.map(({ current_type }) => current_type)
		)

		return all_possible_types.filter(type => !types_used_already.has(type))
	}

	type CountFunction = <T>(array: Array<T>, predicate: (element: T) => boolean) => number
	const count: CountFunction = (array, predicate) => array.reduce((total, element) => total + (predicate(element) ? 1 : 0), 0)

	const on_display_details = (latest_display_details: DisplayDetail[]) => {
		current_details = latest_display_details.filter(is_valid_detail)
		if (!latest_display_details.some(({ value }) => value === ``) && latest_display_details.length < all_possible_types.length) {
			display_details = [
				...latest_display_details,
				make_empty_value()
			]
		} else if (count(latest_display_details, ({ value }) => value === ``) > 1) {
			// need to only keep the *last* item with an empty value
			display_details = latest_display_details.filter(({ value }) => value !== ``)
		}
	}

	$: on_display_details(display_details)
</script>

{#each display_details as detail, index}
	<BillToInput
		allowed_types={get_allowed_types(display_details.slice(0, index))}
		bind:current_type={detail.current_type}
		bind:value={detail.value}
	/>
{/each}
