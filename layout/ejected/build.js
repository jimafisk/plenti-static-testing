import makeHtml from './makeHtml.js';
import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';

const io = [];

nodes.forEach(node => {
  let filename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  let route = node.type.charAt(0).toUpperCase() + node.type.slice(1); 
  io.push({
    src: path.join(path.resolve(), 'layout/global/Html.svelte'),
    dest: path.join(path.resolve(), 'public/testout/' + filename),
    route: route,
    node: node,
    nodes: nodes
  });
});

const main = () =>
  fs.promises
    // Create the output directory if it doesn't already exist.
    .mkdir(path.join(path.resolve(), 'public/testout'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtml(io).map((html, i) =>
          fs.promises.writeFile(io[i].dest, html),
        ),
      ),
    );

main();
