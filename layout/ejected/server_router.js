import makeHtml from './make_html.js';
import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';

import {create_ssr_component, escape} from 'svelte/internal/index.mjs';
import svelte from 'svelte/compiler.js';
import 'svelte/register.js';
import relative from 'require-relative';

// START
const Pages = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
  let { allNodes } = $$props;
  let { title } = $$props, { description } = $$props;
  if ($$props.allNodes === void 0 && $$bindings.allNodes && allNodes !== void 0) $$bindings.allNodes(allNodes);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  return `<h1>${escape(title)}</h1>
<p>Pages template</p>
<a href="${"/"}">Back home</a>
<div><strong>Title:</strong><span>${escape(title)}</span>
<strong>Desc:</strong><span>${escape(description)}</span></div>
<h3>All nodes test:</h3>`;
});
// END !!!

nodes.forEach(node => {
  let sourceFilename = node.type + '.svelte';
  let sourcePath = path.join(path.resolve(), 'layout/content/' + sourceFilename);
  let sourceComponent = fs.readFileSync(sourcePath, 'utf8');
  let destFilename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  let destPath = path.join(path.resolve(), 'public/' + destFilename);
  let topLevelComponent = path.join(path.resolve(), 'layout/global/html.svelte');
  /*
  const { js } = svelte.compile(sourceComponent, {
    generate: 'ssr'
  });
  console.log(js);
  */
  //let route = Pages;
  // Create HTML file.
  const route = relative(sourcePath, process.cwd()).default;
  let props = {
    route: route,
    node: node,
    allNodes: nodes
  };
  const component = relative(topLevelComponent, process.cwd()).default;
  //console.log(component);
  const { html, css } = component.render(props);
  fs.promises.mkdir(path.join(path.resolve(), 'public'), {recursive: true})
  fs.promises.writeFile(destPath, html);
  /*
  io.push({
    src: path.join(path.resolve(), 'layout/global/html.svelte'),
    dest: path.join(path.resolve(), 'public/' + filename),
    route: route,
    node: node,
    nodes: nodes
  });
  */
});

const main = () =>
  fs.promises
    // Create the output directory if it doesn't already exist.
    .mkdir(path.join(path.resolve(), 'public'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtml(io).map((html, i) =>
          fs.promises.writeFile(io[i].dest, html),
        ),
      ),
    );

//main();
