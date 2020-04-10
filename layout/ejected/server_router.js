import makeHtml from './make_html.js';
import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';

// START !!!
import {create_ssr_component, escape} from 'svelte/internal/index.mjs';
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

<h3>All nodes test:</h3>
`;
});
// END !!!

const io = [];

nodes.forEach(node => {
  let filename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  //let route = node.type.charAt(0).toUpperCase() + node.type.slice(1); 
  let route = Pages;
  console.log('route is: ' + route);
  io.push({
    src: path.join(path.resolve(), 'layout/global/html.svelte'),
    dest: path.join(path.resolve(), 'public/' + filename),
    route: route,
    node: node,
    nodes: nodes
  });
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

main();
