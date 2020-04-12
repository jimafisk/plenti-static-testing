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
//console.log(Pages);
// END !!!

//import 'svelte/ssr/register';
//import compile from 'svelte/register.js';
import svelte from 'svelte/compiler.js';

const io = [];

nodes.forEach(node => {
  let filename = node.filename.substr(0, node.filename.lastIndexOf(".")) + ".html";
  //let route = node.type.charAt(0).toUpperCase() + node.type.slice(1); 
  let sourcePath = path.join(path.resolve(), 'layout/content/' + node.type + '.svelte');
  //let source = node.type + '.svelte';
  //console.log(sourcePath);
  let sourceComponent = fs.readFileSync(sourcePath, 'utf8');
  //console.log(sourceComponent);
  const { js, vars, ast } = svelte.compile(sourceComponent, {
    generate: 'ssr'
  });
  //console.log(typeof js.code);
  //console.log(typeof js.code.valueOf());
  //let route = Pages;
  //console.log(js.code);
  //let mjsCode = js.code.replace('from "svelte/internal";', 'from "svelte/internal/index.mjs";');
  //let mjsCode = js.code.replace('from "svelte/internal";', 'from "../../node_modules/svelte/internal/index.mjs";');
  //let mjsCode = js.code.replace('from "svelte/internal";', 'from "/home/jimafisk/Desktop/kid/node_modules/svelte/internal/index.mjs";');
  //console.log(process.cwd());
  //let libStr = 'from ' + process.cwd() + '/node_modules/svelte/internal/index.mjs;';
  //let mjsCode = js.code.replace('from "svelte/internal";', libStr);
  //let mjsCode = js.code.replace(/import .* from \"svelte\/internal\"\;/, 'import * from "svelte/internal/index.mjs";');
   
  let mjsCode = js.code
    .replace(/import .* from \"svelte\/internal\"\;/, '')
    .replace("export default Component", "");
  
  //const encodedJs = encodeURIComponent(js.code);
  //const mjsCode = 'data:text/javascript;charset=utf-8,' + encodedJs;
  //console.log(mjsCode);
  let Component = eval(mjsCode);
  //let Component = import(js.code)
  /*
  let Component = import(mjsCode)
    .then(Component => console.log(Component.default))
    .catch(error => console.log("can't evaluate component" + error));
  /*
  */
  console.log(Component);
  //let b64moduleData = "data:text/javascript;base64," + Buffer.from(mjsCode).toString('base64');
  //let b64moduleData = 'data:text/javascript;charset=utf-8,' + mjsCode;
  //let b64moduleData = "data:text/javascript;base64," + Buffer.from(js.code).toString('base64');
  //console.log(b64moduleData);
  /*
  import(b64moduleData)
  //import(mjsCode)
    .then((module) => {
      console.log(module.default());
    })
    .catch(error => {
      console.log(error);
    });
  */
  /*
  async function doimport() {
      const module = await import(b64moduleData);
      console.log(module);
  }
  */
  //const module = import(b64moduleData);
  //console.log(module);
  //doimport();
  //fs.promises.mkdir(path.join(path.resolve(), '.temp'), {recursive: true})
  //let tempFileName = process.cwd() + '/.__temporaryFile.mjs';
  //fs.writeFileSync(tempFileName, js.code);
  //fs.writeFileSync(tempFileName, mjsCode);
  //console.log('Temporary mjs file was created!');
  /*
  import(tempFileName)
    .then(module => console.log(module.default))
    .catch(error => console.log(error));
  */
  //let route = Component;
  //let route = 'test';
  //console.log(route);
  //console.log('route is: ' + JSON.stringify(route));
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

main();
