<script lang="ts">
	import ContactInputs from 'shared/ContactInputs.svelte'
	import type { Detail as ContactDetail } from 'shared/ContactInputs.svelte'
	import { is_valid_contact_type } from 'shared/ContactInput.svelte'
	import Label from 'shared/Label.svelte'
	import InputStyle from 'shared/InputStyle.svelte'

	import type { RowStore } from 'shared/list-input/ListInput.svelte'
	import BorderedSection from 'shared/BorderedSection.svelte'

	import LineItems from './LineItems.svelte'

	import type { NameAndAddress, Invoice } from './invoice_types'

	export let initial_invoice_state: Invoice

	export let invoice_number = initial_invoice_state.number
	export let invoice_date = initial_invoice_state.invoice_date

	export let row_stores: RowStore[] = []
	export let bill_to: NameAndAddress
	export let seller: NameAndAddress

	const name_and_address_to_contact_detail = (name_and_address: NameAndAddress): ContactDetail[] => Object.entries(name_and_address)
		.map(([ key, value ]) => {
			if (is_valid_contact_type(key) && value) {
				return { current_type: key, value }
			}

			return null
		})
		.filter((contact): contact is ContactDetail => contact !== null)

	let bill_to_name = initial_invoice_state.bill_to.name
	let bill_to_details: ContactDetail[] = name_and_address_to_contact_detail(initial_invoice_state.bill_to)

	let seller_name = initial_invoice_state.seller.name
	let seller_details: ContactDetail[] = name_and_address_to_contact_detail(initial_invoice_state.seller)

	$: bill_to = {
		name: bill_to_name,
		...details_to_object(bill_to_details)
	}

	$: seller = {
		name: seller_name,
		...details_to_object(seller_details)
	}

	const details_to_object = (contact_details: ContactDetail[]) => ({
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
