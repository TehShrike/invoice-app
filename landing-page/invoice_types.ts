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

export type Invoice = {
	seller: NameAndAddress,
	bill_to: NameAndAddress,
	line_items: LineItem[],
}
