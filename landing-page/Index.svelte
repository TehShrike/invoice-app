<script lang="ts">
	import Child from './Child.svelte'

	import meh from './some_lib.ts'
	let wat: string = `hi`

	wat = 2
</script>
<h1>Yo yo yo</h1>

<Child some_num='wat' />
