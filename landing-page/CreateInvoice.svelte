<script lang="ts">
	import ContactInputs from 'shared/ContactInputs.svelte'
	import type { Details as ContactDetails } from 'shared/ContactInputs.svelte'
	import Label from 'shared/Label.svelte'
	import InputStyle from 'shared/InputStyle.svelte'
	import { js_date_to_iso_date_string } from 'shared/date'

	import type { RowStore } from 'shared/list-input/ListInput.svelte'
	import BorderedSection from 'shared/BorderedSection.svelte'

	import LineItems from './LineItems.svelte'

	import type { NameAndAddress } from './invoice_types'

	let invoice_number = 1001
	let invoice_date = js_date_to_iso_date_string(new Date())

	export let row_stores: RowStore[] = []
	export let bill_to: NameAndAddress
	export let seller: NameAndAddress

	let bill_to_name = ``
	let bill_to_details: ContactDetails = []

	let seller_name = ``
	let seller_details: ContactDetails = []

	$: bill_to = {
		name: bill_to_name,
		...details_to_object(bill_to_details)
	}

	$: seller = {
		name: seller_name,
		...details_to_object(seller_details)
	}

	const details_to_object = (contact_details: ContactDetails) => ({
		address: null,
		phone: null,
		email: null,
		...Object.fromEntries(contact_details.map(({ current_type, value }) => [ current_type, value ]))
	})

</script>

<div class="container_column">
	<div class="document_grid">
		<BorderedSection>
			<h3 class=accent-bottom>Your information</h3>
			<Label>
				Your name or company
				<InputStyle>
					<input type="text" bind:value={seller_name}>
				</InputStyle>
			</Label>
			<ContactInputs bind:current_details={seller_details} />
		</BorderedSection>

		<span></span>

		<BorderedSection>
			<h3 class=accent-bottom>Bill to</h3>
			<Label>
				Name or company
				<InputStyle>
					<input type="text" bind:value={bill_to_name}>
				</InputStyle>
			</Label>
			<ContactInputs bind:current_details={bill_to_details} />
		</BorderedSection>

		<BorderedSection>
			<Label>
				Invoice #
				<InputStyle>
					<input type="number" bind:value={invoice_number}>
				</InputStyle>
			</Label>
			<Label>
				Date
				<InputStyle>
					<input type="date" bind:value={invoice_date} style="font-family: sans-serif;">
				</InputStyle>
			</Label>
		</BorderedSection>
	</div>

	<LineItems bind:row_stores />
</div>

<style>
	.container_column {
		display: flex;
		flex-direction: column;
		gap: var(--element_spacing_gap);
	}
	.document_grid {
		--section_size: 400px;
		display: grid;
		justify-content: space-between;
		grid-template-columns: var(--section_size) var(--section_size);
		grid-template-rows: 1fr;
		gap: var(--element_spacing_gap);
	}

	.accent-bottom {
		border-bottom: solid var(--red) 2px;
	}
</style>
