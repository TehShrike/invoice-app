const { resolve } = require(`path`)
const { execSync: exec_sync } = require(`child_process`)

const cheap_watch = require(`cheap-watch`)

const [ ,, input_directory, ...cmd_args ] = process.argv

const absolute_path = resolve(__dirname, input_directory)

const watcher = new cheap_watch({
	dir: absolute_path,
})

const executing = new Set()
const execute_finish_time = new Map()

const execute = path => {
	if (executing.has(path)) {
		return
	}
	if (execute_finish_time.has(path) && Date.now() - execute_finish_time.get(path) < 100) {
		return
	}

	executing.add(path)
	try {
		const full_command = cmd_args.map(arg => arg.replaceAll(`~PATH~`, path)).join(` `)

		console.log('executing', full_command, '...')
		exec_sync(full_command, {
			stdio: `inherit`,
		})
	} finally {
		executing.delete(path)
		execute_finish_time.set(path, Date.now())
	}
}

watcher.init()

watcher.on(`+`, ({ path }) => execute(path))

