# Top priorities

- Visual legibility
- Speed of data entry

# Todo

- save current information to localstorage
	- now that `initial_invoice_state` is passed in from the outside, this is possible
	- serialize the `invoice` variable in Index.svelte
- start laying out printable invoice down below
	- your information
	- invoice metadata section
		- invoice (vs quote)
		- invoice number
		- invoice date
	- bill to
	- line items
	- total
- "quote" mode – what does it need to do besides saying "quote" as opposed to "invoice"?
- other invoice metadata fields – due date, etc
- tax
- discount
- images
	- upload images for line items
	- figure out how to lay out images in printable pdf
- get sourcemaps working
