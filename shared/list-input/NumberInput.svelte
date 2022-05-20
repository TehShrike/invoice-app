<script lang=ts>
	import type { Writable } from 'svelte/store'
	import number from 'financial-number'
	import type { FinancialNumber } from 'financial-number'

	import ListInputStyle from './ListInputStyle.svelte'

	export let min = 0
	export let max: number | null = null
	export let disabled = false
	export let precision = 2

	export let store: Writable<FinancialNumber>

	let input_element: HTMLInputElement

	export const set_focus = () => {
		input_element.focus()
	}

	$: step = (10 ** -precision).toString()

	$: min !== null && typeof min !== `number` && console.error(`min should be of type number instead of "${typeof min}" ("${min}")`)
	$: max !== null && typeof max !== `number` && console.error(`max should be of type number instead of "${typeof max}" ("${max}")`)
	$: typeof precision !== `number` && console.error(`precision should be of type number instead of "${typeof precision}" ("${precision}")`)

	const handle_input_value = (input_value: number) => {
		const does_not_exceed_max = max === null || input_value <= max
		const does_not_subceed_min = min === null || input_value >= min
		if (
			typeof input_value === `number`
			&& does_not_subceed_min
			&& does_not_exceed_max
			&& number(input_value.toString()).mod(step).equal(`0`)
		) {
			$store = number(input_value.toString()).changePrecision(precision)
		}
	}

	const validate_input_value = () => {
		if (input_value === null) {
			$store = number(`0`).changePrecision(precision)
		}

		// I think this might be extraneous now – I wish I could detect the difference between
		// "empty" and "user typed jibberish"
		if (input_value === null || !$store.equal(input_value.toString())) {
			input_value = parseFloat($store.toString())
		}

		if ($store.getPrecision() !== number(input_value.toString()).getPrecision()) {
			input_element.value = $store.toString()
		}
	}

	let input_value: number = parseFloat($store.toString())
	
	$: input_element && validate_input_value()

	$: input_element && handle_input_value(input_value)

	const on_focus = () => {
		input_element.select()
	}
</script>

<ListInputStyle>
	<input
		type="number"
		min={min}
		max={max}
		step={step}
		bind:value={input_value}
		disabled={disabled}
		on:blur={validate_input_value}
		bind:this={input_element}
		on:focus
		on:focus={on_focus}
		on:blur
		{...$$restProps}
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
