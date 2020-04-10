<script>
  import Head from './Head.svelte';
  import Nav from './Nav.svelte';
  import { makeTitle } from './Scripts.svelte';

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
