<script lang=ts context=module>
	export type Detail = {
		current_type: InputTypes,
		value: string
	}

	export type Details = Detail[]
</script>

<script lang=ts>
	import ContactInput from 'shared/ContactInput.svelte'
	import type { InputTypes } from 'shared/ContactInput.svelte'

	export let current_details: Details = []

	type DisplayDetail = Omit<Detail, `current_type`> & {
		current_type: InputTypes | null,
		element: HTMLTextAreaElement | null,
		identity: number
	}

	let next_identity = 0
	const make_empty_value = () => ({
		current_type: null,
		value: ``,
		element: null,
		identity: next_identity++
	})

	let display_details: DisplayDetail[] = [
		...current_details.map((detail): DisplayDetail => ({
			identity: next_identity++,
			element: null,
			...detail
		})),
		make_empty_value()
	]

	const all_possible_types: InputTypes[] = [ `email`, `phone`, `address` ]

	const is_valid_detail = (detail: DisplayDetail | Detail): detail is Detail => detail.current_type !== null

	const get_allowed_types = (previous_details: DisplayDetail[]) => {
		const types_used_already = new Set(
			previous_details.map(({ current_type }) => current_type)
		)

		return all_possible_types.filter(type => !types_used_already.has(type))
	}

	const only_keep_appropriate_empty_row = (rows: DisplayDetail[]): DisplayDetail[] => {
		// if the current focused element is empty, keep it and get rid of the rest
		// otherwise, keep the first empty one and get rid of the rest
		const active_element = document.activeElement

		const empty_to_keep = rows.reduce((best_so_far: DisplayDetail | null, current) => {
			const is_empty = current.value === ``

			if (!is_empty) {
				return best_so_far
			}

			if (current.element === active_element || !best_so_far) {
				return current
			}

			return best_so_far
		}, null)

		return rows.filter(row => row.value || row === empty_to_keep)
	}

	type CountFunction = <T>(array: Array<T>, predicate: (element: T) => boolean) => number
	const count: CountFunction = (array, predicate) => array.reduce((total, element) => total + (predicate(element) ? 1 : 0), 0)

	const on_display_details = (latest_display_details: DisplayDetail[]) => {
		current_details = latest_display_details.filter(is_valid_detail) as Details
		if (!latest_display_details.some(({ value }) => value === ``) && latest_display_details.length < all_possible_types.length) {
			display_details = [
				...latest_display_details,
				make_empty_value()
			]
		} else if (count(latest_display_details, ({ value }) => value === ``) > 1) {
			display_details = only_keep_appropriate_empty_row(display_details)
		}
	}

	$: on_display_details(display_details)
</script>

{#each display_details as detail, index (detail.identity)}
	<ContactInput
		allowed_types={get_allowed_types(display_details.slice(0, index))}
		bind:current_type={detail.current_type}
		bind:value={detail.value}
		bind:element={detail.element}
	/>
{/each}
