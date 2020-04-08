import makeHtmlWithStyle from './makeHtml.js';
import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';

const io = [];

nodes.forEach(node => {
  let filename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  io.push({src: 'Html.svelte', dest: filename});
});

let ioFull = io.map(x => ({
  src: path.join(path.resolve(), 'layout/global/', x.src),
  dest: path.join(path.resolve(), 'public/testout', x.dest),
}));

const main = () =>
  fs.promises
    // Create the output directory if it doesn't already exist.
    .mkdir(path.join(path.resolve(), 'public/testout'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtmlWithStyle(ioFull.map(({src}) => src), 'Nav', {filename:'test'}, nodes).map((html, i) =>
          fs.promises.writeFile(ioFull[i].dest, html),
        ),
      ),
    );

main();
