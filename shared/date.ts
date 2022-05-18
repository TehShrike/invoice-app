const pad2 = (number: number) => number.toString().padStart(2, `0`)

export const to_iso_date_string = ({ year, month, day }: { year: number, month: number, day: number}) => `${year}-${pad2(month)}-${pad2(day)}`

export const js_date_to_iso_date_string = (date: Date) => to_iso_date_string({
	year: date.getFullYear(),
	month: date.getMonth() + 1,
	day: date.getDate(),
})
