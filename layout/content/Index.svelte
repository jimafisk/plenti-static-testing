<script>
	export let name;
	export let allNodes;
  import Component from './Component.svelte';
</script>

<section id="intro">
	<h1>{name}</h1>
  <Component />
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<h3>Recent blog posts:</h3>
  {#each allNodes as node}
		{#if node.type == 'blog'}
			<a href="{node.path}">{node.fields.title}</a>
			<br />
		{/if}
	{/each}
</section>
