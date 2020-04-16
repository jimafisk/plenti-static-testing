import svelte from 'svelte/compiler.js';

// Get the arguments from command execution.
const args = process.argv.slice(2)

// Create component JS that can run in the browser.
let { js } = svelte.compile(args[0], {});

export default js.code;
