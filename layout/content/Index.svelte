<script>
	export let name;
	export let allNodes;
  import Component from './Component.svelte';
</script>

<section id="intro">
	<img alt="plenti logo" src="/build/plenti.svg" />
	<h1>{name}</h1>
  <Component />
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<h3>Recent blog posts:</h3>
</section>
