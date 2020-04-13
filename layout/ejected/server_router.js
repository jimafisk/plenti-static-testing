import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';
import 'svelte/register.js';
import relative from 'require-relative';

nodes.forEach(node => {
  let sourceFilename = node.type + '.svelte';
  let sourcePath = path.join(path.resolve(), 'layout/content/' + sourceFilename);
  let sourceComponent = fs.readFileSync(sourcePath, 'utf8');
  let destFilename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  let destPath = path.join(path.resolve(), 'public/' + destFilename);
  let topLevelComponent = path.join(path.resolve(), 'layout/global/html.svelte');
  const route = relative(sourcePath, process.cwd()).default;
  let props = {
    route: route,
    node: node,
    allNodes: nodes
  };
  // Create HTML file.
  const component = relative(topLevelComponent, process.cwd()).default;
  const { html, css } = component.render(props);
  fs.promises.mkdir(path.join(path.resolve(), 'public'), {recursive: true})
  fs.promises.writeFile(destPath, html);
});
