<script lang="ts">
	import { fromStore } from 'svelte/store'
	import type { Writable } from 'svelte/store'
	import number from 'financial-number'
	import type { FinancialNumber } from 'financial-number'

	import ListInputStyle from './ListInputStyle.svelte'

	let {
		min = 0,
		max = null,
		disabled = false,
		precision = 2,
		store,
		set_focus = $bindable(),
		onfocus,
		onblur,
		...rest_props
	}: {
		min?: number | null,
		max?: number | null,
		disabled?: boolean,
		precision?: number,
		store: Writable<FinancialNumber>,
		set_focus?: () => void,
		onfocus?: () => void,
		onblur?: () => void,
		[key: string]: any,
	} = $props()

	const store_value = fromStore(store)

	let input_element: HTMLInputElement

	set_focus = () => {
		input_element.focus()
	}

	let step = $derived((10 ** -precision).toString())

	const handle_input_value = (new_input_value: number) => {
		const does_not_exceed_max = max === null || new_input_value <= max
		const does_not_subceed_min = min === null || new_input_value >= min
		if (
			typeof new_input_value === `number`
			&& does_not_subceed_min
			&& does_not_exceed_max
			&& number(new_input_value.toString()).mod(step).equal(`0`)
		) {
			store.set(number(new_input_value.toString()).changePrecision(precision))
		}
	}

	const validate_input_value = () => {
		if (input_value === null) {
			store.set(number(`0`).changePrecision(precision))
		}

		const current = store_value.current
		if (input_value === null || !current.equal(input_value.toString())) {
			input_value = parseFloat(current.toString())
		}

		if (current.getPrecision() !== number(input_value.toString()).getPrecision()) {
			input_element.value = current.toString()
		}
	}

	let input_value: number | null = $state(parseFloat(store_value.current.toString()))

	$effect(() => {
		if (input_element && input_value !== null) {
			handle_input_value(input_value)
		}
	})

	const on_focus = () => {
		input_element.select()
		onfocus?.()
	}
</script>

<ListInputStyle>
	<input
		type="number"
		{min}
		{max}
		{step}
		bind:value={input_value}
		{disabled}
		onblur={() => { validate_input_value(); onblur?.() }}
		bind:this={input_element}
		onfocus={on_focus}
		{...rest_props}
	/>
</ListInputStyle>

<style>
	input {
		text-align: right;
		font-variant-numeric: tabular-nums;
		-webkit-appearance: textfield;
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input:focus {
		-moz-appearance: textfield !important;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		display: none;
		-webkit-appearance: none;
	}
</style>
