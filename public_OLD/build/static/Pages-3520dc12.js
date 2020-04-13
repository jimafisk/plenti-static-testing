'use strict';

var internal = require('svelte/internal');

/* layout/content/Pages.svelte generated by Svelte v3.20.1 */

const Pages = internal.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { allNodes } = $$props;
	let { title } = $$props, { description } = $$props;
	if ($$props.allNodes === void 0 && $$bindings.allNodes && allNodes !== void 0) $$bindings.allNodes(allNodes);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);

	return `<h1>${internal.escape(title)}</h1>
<p>Pages template</p>
<a href="${"/"}">Back home</a>
<div><strong>Title:</strong><span>${internal.escape(title)}</span>
<strong>Desc:</strong><span>${internal.escape(description)}</span></div>

<h3>All nodes test:</h3>
`;
});

exports.default = Pages;
//# sourceMappingURL=Pages-3520dc12.js.map
