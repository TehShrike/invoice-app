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

	$: label = current_type
		? type_names[current_type]
		: allowed_types.map(type => type_names[type]).join(`/`)

	$: console.log({ allowed_types, current_type, value, label })

	const email_regex = /[^ ]+@[^ ]+\.[^ ]+/
	const is_email = (value: string) => email_regex.test(value)

	const phone_regex = /[\d\s\-.()+]{7,}/
	const is_phone = (value: string) => phone_regex.test(value)

	const on_blur = () => {
		if (is_email(value)) {
			current_type = `email`
		} else if (is_phone(value)) {
			current_type = `phone`
		} else if (value.length > 0) {
			current_type = `address`
		} else {
			current_type = null
		}
	}
</script>

<Label>
	{label}
	<InputStyle>
		<input type="text" bind:value on:blur={on_blur}>
	</InputStyle>
</Label>

<style>

</style>
