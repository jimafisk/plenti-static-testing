<script>
  export let allNodes;
</script>

<div class="grid">
  {#each allNodes as node}
		{#if node.type == 'blog'}
      <a class="grid-item" href="{node.path}">{node.fields.title}</a>
		{/if}
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  .grid-item {
    display: flex;
    flex-grow: 1;
    height: 200px;
    background: var(--base);
    align-items: center;
    justify-content: center;
  }
</style>
