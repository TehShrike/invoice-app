import type { FinancialNumber } from 'financial-number'

export type NameAndAddress = {
	name: string,
	email: string | null,
	phone: string | null,
	address: string | null,
}

export type LineItem = {
	description: string,
	quantity: FinancialNumber,
	price: FinancialNumber,
	total: FinancialNumber,
}

export type Iso8601Date = `${number}-${number}-${number}`

export type Invoice = {
	number: number,
	invoice_date: Iso8601Date,
	seller: NameAndAddress,
	bill_to: NameAndAddress,
	line_items: LineItem[],
}
