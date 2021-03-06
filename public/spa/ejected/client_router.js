/* generated by Svelte v3.20.1 */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	init,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "../web_modules/svelte/internal/index.js";

import Navaid from "../web_modules/navaid.js";
import DataSource from "./data_source.js";
import Html from "../global/html.js";

function create_fragment(ctx) {
	let current;

	const html = new Html({
			props: {
				Route: /*Route*/ ctx[0],
				node: /*node*/ ctx[1],
				allNodes: /*allNodes*/ ctx[2]
			}
		});

	return {
		c() {
			create_component(html.$$.fragment);
		},
		m(target, anchor) {
			mount_component(html, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const html_changes = {};
			if (dirty & /*Route*/ 1) html_changes.Route = /*Route*/ ctx[0];
			if (dirty & /*node*/ 2) html_changes.node = /*node*/ ctx[1];
			if (dirty & /*allNodes*/ 4) html_changes.allNodes = /*allNodes*/ ctx[2];
			html.$set(html_changes);
		},
		i(local) {
			if (current) return;
			transition_in(html.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(html.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(html, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let Route, node, allNodes;
	let uri = location.pathname;
	node = DataSource.getNode(uri);
	allNodes = DataSource.getAllNodes();

	function draw(m) {
		$$invalidate(0, Route = m.default);
		window.scrollTo(0, 0);
	}

	function track(obj) {
		uri = obj.state || obj.uri;
		if (window.ga) ga.send("pageview", { dp: uri });
		$$invalidate(1, node = DataSource.getNode(uri));
		$$invalidate(2, allNodes = DataSource.getAllNodes());
	}

	addEventListener("replacestate", track);
	addEventListener("pushstate", track);
	addEventListener("popstate", track);
	const router = Navaid("/").on("/", () => import("../content/index.js").then(draw)).on("/:slug", () => import("../content/pages.js").then(draw)).on("/blog/:slug", () => import("../content/blog.js").then(draw)).listen();
	return [Route, node, allNodes];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;