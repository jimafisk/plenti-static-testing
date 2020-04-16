import path from 'path';
import fs from 'fs';
import nodes from './nodes.js';
import 'svelte/register.js';
import relative from 'require-relative';
import svelte from 'svelte/compiler.js';

//const result = svelte.compile('./main.js', {
//const result = svelte.compile('./client_router.svelte', {
//const result = svelte.compile('../layout/html.svelte', {
//let sourcePath = path.join(path.resolve(), 'layout/content/' + sourceFilename);
//let srcPath = path.join(path.resolve(), 'layout/content/pages.svelte');
//let source = fs.readFile(srcPath, 'utf8');

const injectString = (order, content, element, html) => {
	if (order == 'prepend') {
		return html.replace(element, content + element);
	} else if (order == 'append') {
		return html.replace(element, element + content);
	}
};

const ensureDirExists = filePath => {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return true;
	}
	ensureDirExists(dirname);
	fs.mkdirSync(dirname);
}
// Start client
//let spaSourcePath = path.join(path.resolve(), 'layout/ejected/client_router.svelte');
let sPaths = []; 
sPaths.push('ejected/client_router.svelte');
sPaths.push('global/html.svelte');
sPaths.push('global/nav.svelte');
sPaths.push('global/head.svelte');
sPaths.push('global/footer.svelte');
sPaths.push('content/pages.svelte');
sPaths.push('content/index.svelte');
sPaths.push('content/blog.svelte');
sPaths.push('components/grid.svelte');
sPaths.push('scripts/make_title.svelte');
sPaths.forEach(sPath => {
  let spaSourcePath = path.join(path.resolve(), 'layout/' + sPath);
	let spaSourceComponent = fs.readFileSync(spaSourcePath, 'utf8');
	//spaSourceComponent = relative(spaSourceComponent, process.cwd()).default;
	let { js } = svelte.compile(spaSourceComponent, {
	});
	let spaDestPath = 'public/special/' + sPath.substr(0, sPath.lastIndexOf(".")) + ".js";
	//let spaDestPath = 'public/special/main.js';
  js.code = js.code.replace(/\.svelte/g, '.js');
  js.code = js.code.replace(/from "svelte\/internal"\;/g, 'from "../web_modules/svelte/internal.js";');
  js.code = js.code.replace(/from "svelte"\;/g, 'from "../web_modules/svelte.js";');
  js.code = js.code.replace(/from "navaid"\;/g, 'from "../web_modules/navaid.js";');
	ensureDirExists(spaDestPath);
	fs.promises.writeFile(spaDestPath, js.code);
});
// End client

nodes.forEach(node => {
  let sourcePath = path.join(path.resolve(), 'layout/content/' + node.type + '.svelte');
  let sourceComponent = fs.readFileSync(sourcePath, 'utf8');
  let index = node.filename == 'index.json' ? 'index' : '';
  let destPath = path.join(path.resolve(), 'public/' + node.path + index + ".html");
  let topLevelComponent = path.join(path.resolve(), 'layout/global/html.svelte');
  const route = relative(sourcePath, process.cwd()).default;
  let props = {
    Route: route,
    node: node,
    allNodes: nodes
  };
  // Create HTML file.
  const component = relative(topLevelComponent, process.cwd()).default;
  let { html, css } = component.render(props);
  // Inject Style.
  let style = `<style>${css.code}</style>`;
  html = injectString('prepend', style, '</head>', html);
  // Inject SPA entry point.
  let entryPoint = `
  <script type="module" src="https://unpkg.com/dimport?module" data-main="/special/ejected/main.js"></script>
  <script nomodule src="https://unpkg.com/dimport/nomodule" data-main="/special/ejected/main.js"></script>
	`;
  html = injectString('prepend', entryPoint, '</head>', html);
  // Inject ID used to hydrate SPA.
  let hydrator = ' id="hydrate-plenti"';
  html = injectString('append', hydrator, '<html', html);
  // Write HTML files to filesystem.
  ensureDirExists(destPath);
  fs.promises.writeFile(destPath, html);
});
