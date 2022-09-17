import { value as warg_value } from 'warg'

const safe_ish_parse = <T>(string: string | null, default_value: T): T => {
	if (!string) {
		return default_value
	}
	try {
		return JSON.parse(string)
	} catch (_) {
		return default_value
	}
}

export default <T>(key: string, default_value: T) => {
	const initial_string = localStorage.getItem(key)
	const value = warg_value(safe_ish_parse(initial_string, default_value))

	const set = (new_value: T) => {
		localStorage.setItem(key, JSON.stringify(new_value))
		value.set(new_value)
	}

	return {
		...value,
		set
	}
}
