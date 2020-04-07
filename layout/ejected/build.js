const {makeHtmlWithStyle} = require('./makeHtml.js');                     

const path = require('path');
const fs = require('fs');

const io = [
  {src: 'Index.svelte', dest: 'index.html'},
].map(x => ({
  src: path.join(__dirname, '../content/', x.src),
  dest: path.join(__dirname, '../../public/testout', x.dest),
}));

const main = () =>
  fs.promises
    .mkdir(path.join(__dirname, '../../public/testout'), {recursive: true})

    .then(() =>
      Promise.all(
        makeHtmlWithStyle(io.map(({src}) => src)).map((html, i) =>
          fs.promises.writeFile(io[i].dest, html),
        ),
      ),
    );

if (require.main === module) {
  main();
} else {
  module.exports = {build: main, io};
}
