<script lang="ts">
	import ContactInputs from 'shared/ContactInputs.svelte'
	import type { Details as ContactDetails } from 'shared/ContactInputs.svelte'
	import Label from 'shared/Label.svelte'
	import InputStyle from 'shared/InputStyle.svelte'
	import { js_date_to_iso_date_string } from 'shared/date'

	import LineItems from './LineItems.svelte'
	import type { RowStore } from 'shared/list-input/ListInput.svelte'
	import Card from 'shared/Card.svelte'
	import BorderedSection from 'shared/BorderedSection.svelte'

	let invoice_number = 1001
	let invoice_date = js_date_to_iso_date_string(new Date())

	export let row_stores: RowStore[] = []

	let bill_to_name = ``
	let bill_to_details: ContactDetails = []

	let seller_name = ``
	let seller_details: ContactDetails = []
</script>

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

<style>
	.document_grid {
		--section_size: 400px;
		display: grid;
		justify-content: space-between;
		grid-template-columns: var(--section_size) var(--section_size);
		grid-auto-rows: 1fr;
		gap: 16px;
	}

	.accent-bottom {
		border-bottom: solid var(--red) 2px;
	}
</style>
