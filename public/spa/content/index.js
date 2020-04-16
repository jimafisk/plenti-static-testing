/* generated by Svelte v3.20.1 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../web_modules/svelte/internal/index.js";

import Grid from "../components/grid.js";

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let section;
	let p;
	let t5;
	let h3;
	let t7;
	let current;

	const grid = new Grid({
			props: {
				items: /*allNodes*/ ctx[1],
				filter: "blog"
			}
		});

	return {
		c() {
			h1 = element("h1");
			t0 = text(/*name*/ ctx[0]);
			t1 = space();
			section = element("section");
			p = element("p");
			p.innerHTML = `Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.`;
			t5 = space();
			h3 = element("h3");
			h3.textContent = "Recent blog posts:";
			t7 = space();
			create_component(grid.$$.fragment);
			attr(section, "id", "intro");
		},
		m(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t0);
			insert(target, t1, anchor);
			insert(target, section, anchor);
			append(section, p);
			append(section, t5);
			append(section, h3);
			append(section, t7);
			mount_component(grid, section, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1) set_data(t0, /*name*/ ctx[0]);
			const grid_changes = {};
			if (dirty & /*allNodes*/ 2) grid_changes.items = /*allNodes*/ ctx[1];
			grid.$set(grid_changes);
		},
		i(local) {
			if (current) return;
			transition_in(grid.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(grid.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(h1);
			if (detaching) detach(t1);
			if (detaching) detach(section);
			destroy_component(grid);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { name } = $$props;
	let { allNodes } = $$props;

	$$self.$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("allNodes" in $$props) $$invalidate(1, allNodes = $$props.allNodes);
	};

	return [name, allNodes];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { name: 0, allNodes: 1 });
	}
}

export default Component;