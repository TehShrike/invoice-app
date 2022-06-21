import { value as warg_value } from 'warg'

export default <T>(key: string, default_value: T) => {
	const initial_string = localStorage.getItem(key)
	const value = warg_value(initial_string ? JSON.parse(initial_string) : default_value)

	const set = (new_value: T) => {
		localStorage.setItem(key, JSON.stringify(new_value))
		value.set(new_value)
	}

	return {
		...value,
		set
	}
}
