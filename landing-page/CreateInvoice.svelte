<script lang="ts">
	import ContactInputs from 'shared/ContactInputs.svelte'
	import type { Details as ContactDetails } from 'shared/ContactInputs.svelte'
	import Label from 'shared/Label.svelte'
	import InputStyle from 'shared/InputStyle.svelte'
	import { js_date_to_iso_date_string } from 'shared/date'

	import LineItems from './LineItems.svelte'
	import type { RowStore } from 'shared/list-input/ListInput.svelte'

	let invoice_number = 1001
	let invoice_date = js_date_to_iso_date_string(new Date())

	export let row_stores: RowStore[] = []

	let bill_to_details: ContactDetails = []

	let seller_details: ContactDetails = []
</script>

<div class="document_grid">
	<span style="max-width: 250px">
		<h3 class=accent-bottom>Seller</h3>
		<ContactInputs bind:current_details={seller_details} />
	</span>

	<span></span>

	<span style="max-width: 250px">
		<h3 class=accent-bottom>Bill to</h3>
		<ContactInputs bind:current_details={bill_to_details} />
	</span>

	<span>
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
	</span>
</div>

<LineItems bind:row_stores />

<style>
	.document_grid {
		display: grid;
		grid-template-columns: 1fr  240px;
		gap: 16px;
	}

	.accent-bottom {
		border-bottom: solid var(--light_blue) 2px;
	}
</style>
