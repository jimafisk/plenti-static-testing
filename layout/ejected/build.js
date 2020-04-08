import makeHtmlWithStyle from './makeHtml.js';
import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';

const io = [];
nodes.forEach(node => {
  let filename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  console.log('filename is: ' + filename);
  io.push({src: 'Pages.svelte', dest: filename});
});

io.forEach(item => {
  console.log('io array item: ' + JSON.stringify(item));
});

/*
const io = [
  {src: 'Index.svelte', dest: 'index.html'},
].map(x => ({
*/

let ioFull = io.map(x => ({
  src: path.join(path.resolve(), 'layout/content/', x.src),
  dest: path.join(path.resolve(), 'public/testout', x.dest),
}));

ioFull.forEach(item => {
  console.log('io fullpath array item: ' + JSON.stringify(item));
});

const main = () =>
  fs.promises
    .mkdir(path.join(path.resolve(), 'public/testout'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtmlWithStyle(ioFull.map(({src}) => src)).map((html, i) =>
          fs.promises.writeFile(ioFull[i].dest, html),
        ),
      ),
    );

main();
