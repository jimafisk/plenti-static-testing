import makeHtmlWithStyle from './makeHtml.js';

import path from 'path';
import fs from 'fs';

const io = [
  {src: 'Index.svelte', dest: 'index.html'},
].map(x => ({
  src: path.join(path.resolve(), 'layout/content/', x.src),
  dest: path.join(path.resolve(), 'public/testout', x.dest),
}));

const main = () =>
  fs.promises
    .mkdir(path.join(path.resolve(), 'public/testout'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtmlWithStyle(io.map(({src}) => src)).map((html, i) =>
          fs.promises.writeFile(io[i].dest, html),
        ),
      ),
    );

main();
