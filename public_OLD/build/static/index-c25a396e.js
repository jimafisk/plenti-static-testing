'use strict';

var internal = require('svelte/internal');

/* layout/components/grid.svelte generated by Svelte v3.20.1 */

const css = {
	code: ".grid.svelte-11t5aph{display:flex}.grid-item.svelte-11t5aph{height:50px;width:50px}.green.svelte-11t5aph{background-color:green}.red.svelte-11t5aph{background-color:red}.blue.svelte-11t5aph{background-color:blue}",
	map: "{\"version\":3,\"file\":\"grid.svelte\",\"sources\":[\"grid.svelte\"],\"sourcesContent\":[\"<div class=\\\"grid\\\">\\n  <div class=\\\"grid-item green\\\"></div>\\n  <div class=\\\"grid-item red\\\"></div>\\n  <div class=\\\"grid-item blue\\\"></div>\\n</div>\\n\\n<style>\\n  .grid {\\n    display: flex;\\n  }\\n  .grid-item {\\n    height: 50px;\\n    width: 50px;\\n  }\\n  .green { background-color: green; }\\n  .red { background-color: red; }\\n  .blue { background-color: blue; }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAOE,KAAK,eAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AACD,UAAU,eAAC,CAAC,AACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AACD,MAAM,eAAC,CAAC,AAAC,gBAAgB,CAAE,KAAK,AAAE,CAAC,AACnC,IAAI,eAAC,CAAC,AAAC,gBAAgB,CAAE,GAAG,AAAE,CAAC,AAC/B,KAAK,eAAC,CAAC,AAAC,gBAAgB,CAAE,IAAI,AAAE,CAAC\"}"
};

const Grid = internal.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css);

	return `<div class="${"grid svelte-11t5aph"}"><div class="${"grid-item green svelte-11t5aph"}"></div>
  <div class="${"grid-item red svelte-11t5aph"}"></div>
  <div class="${"grid-item blue svelte-11t5aph"}"></div>
</div>`;
});

/* layout/content/index.svelte generated by Svelte v3.20.1 */

const Content = internal.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { name } = $$props;
	let { allNodes } = $$props;
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	if ($$props.allNodes === void 0 && $$bindings.allNodes && allNodes !== void 0) $$bindings.allNodes(allNodes);

	return `<h1>${internal.escape(name)}</h1>
<section id="${"intro"}">${internal.validate_component(Grid, "Grid").$$render($$result, {}, {}, {})}
	<p>Visit the <a href="${"https://svelte.dev/tutorial"}">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<h3>Recent blog posts:</h3>
  <ul>${internal.each(allNodes, node => `${node.type == "blog"
	? `<li><a${internal.add_attribute("href", node.path, 0)}>${internal.escape(node.fields.title)}</a></li>`
	: ``}`)}</ul></section>`;
});

exports.default = Content;
//# sourceMappingURL=index-c25a396e.js.map
