# Top priorities

- Visual legibility
- Speed of data entry

# Todo

- working on saving invoice state to localstorage/wherever
	- need to be able to bind the inputs to ContactInputs, probably in the final object state
	- there needs to be one invoice store that gets passed into CreateInvoice, and CreateInvoice needs to translate between that and the seller/bill to/line items.
		- OR I just make CreateInvoice take in an initial invoice, and don't allow updating it from the outside later
- use watchlist to run the auto-formatter in the npm run dev process so I can turn it off in Sublime Text
- start laying out printable invoice down below
- "quote" mode – what does it need to do besides saying "quote" as opposed to "invoice"?
- other invoice metadata fields – due date, etc
- tax
- discount
- images
	- upload images for line items
	- figure out how to lay out images in printable pdf
- get sourcemaps working
