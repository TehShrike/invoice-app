<!-- either an email, phone number, or address -->

<script lang=ts context=module>
	export type InputTypes = `email` | `phone` | `address`

	const type_names = {
		email: `Email`,
		phone: `Phone`,
		address: `Address`
	}
</script>

<script lang=ts>
	import InputStyle from 'shared/InputStyle.svelte'
	import Label from 'shared/Label.svelte'

	export let allowed_types: InputTypes[] = [ `email`, `phone`, `address` ]
	export let current_type: InputTypes | null = null
	export let value = ``
	export let element: HTMLTextAreaElement | null = null

	let allowed_types_set = new Set(allowed_types)

	$: if (
		allowed_types.length !== allowed_types_set.size
		|| allowed_types.some(type => !allowed_types_set.has(type))
	) {
		allowed_types_set = new Set(allowed_types)
	}

	$: label = current_type
		? type_names[current_type]
		: allowed_types.map(type => type_names[type]).join(`/`)

	const email_regex = /[^ ]+@[^ ]+\.[^ ]+/
	const is_email = (value: string) => email_regex.test(value)

	const phone_regex = /[\d\s\-.()+]{7,}/
	const is_phone = (value: string) => phone_regex.test(value)

	const is_definitely_address = (value: string) => /\n/.test(value)

	const is_not_email = (value: string) => /\s/.test(value)
	const is_not_phone = (value: string) => /[^\d \*\(\)\-_\+\.]/.test(value)
	const assign_best_guess_at_type = (value: string) => {
		const can_be_email = allowed_types_set.has(`email`) && !is_not_email(value)
		const can_be_phone = allowed_types_set.has(`phone`) && !is_not_phone(value)

		const address_by_process_of_elimination = !can_be_email && !can_be_phone

		if (is_definitely_address(value)
			|| (value.length > 0 && address_by_process_of_elimination)
		) {
			current_type = `address`
		} else if (is_email(value)) {
			current_type = `email`
		} else if (is_phone(value)) {
			current_type = `phone`
		} else {
			current_type = null
		}

		if (current_type && !allowed_types_set.has(current_type)) {
			current_type = null
		}

		if (allowed_types.length === 1 && !current_type) {
			current_type = allowed_types[0]
		}
	}

	$: replicated_value_for_sizing = allowed_types_set && value + (current_type === `address` ? `\n` : ``)

	const get_replicated_value_for_sizing = (value: string, current_type: string | null) => value + (current_type === `address` ? `\n` : ``)

	$: allowed_types_set && assign_best_guess_at_type(value)
</script>

<Label>
	{label}
	<InputStyle>
		<div
			class="grow-wrap"
			data-replicated-value={get_replicated_value_for_sizing(value, current_type)}
		>
			<textarea
				rows=1
				class=input-style
				bind:value
				bind:this={element}
			/>
		</div>
	</InputStyle>
</Label>

<style>
	/* cribbed from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
	.grow-wrap {
		display: grid;
		width: 100%;
	}
	.grow-wrap::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) " ";

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	textarea {
		resize: none;
		overflow: hidden;
	}
	textarea,
	.grow-wrap::after {
		/* Identical styling required!! */
		padding: 4px 8px;

		font: inherit;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}
</style>
