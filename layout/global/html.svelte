<script>
  import Head from './head.svelte';
  import Nav from './nav.svelte';
  import { makeTitle } from './scripts.svelte';

  export let Route, node, allNodes;
</script>

<html lang="en">
<Head title={makeTitle(node.filename)} />
<body>
  <Nav />
  <main>
    <details>
      <summary>Click to show Route class</summary>
      <pre>{Route}</pre>
    </details>
    <svelte:component this={Route} {...node.fields} {allNodes} />
  </main>
</body>
</html>
