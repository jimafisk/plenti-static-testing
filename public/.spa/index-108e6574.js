
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_each_argument, b as validate_slots, e as empty, c as insert_dev, f as detach_dev, g as element, h as attr_dev, j as add_location, n as noop, k as destroy_each, t as text, l as append_dev, m as set_data_dev, o as space, p as create_component, q as mount_component, r as transition_in, u as transition_out, w as destroy_component } from './main-b655b8e7.js';

/* layout/components/grid.svelte generated by Svelte v3.20.1 */

const file = "layout/components/grid.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (7:2) {#if item.type == filter}
function create_if_block(ctx) {
	let a;
	let t_value = /*item*/ ctx[2].fields.title + "";
	let t;
	let a_href_value;

	const block = {
		c: function create() {
			a = element("a");
			t = text(t_value);
			attr_dev(a, "class", "grid-item svelte-v5lmdn");
			attr_dev(a, "href", a_href_value = /*item*/ ctx[2].path);
			add_location(a, file, 7, 6, 125);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*items*/ 1 && t_value !== (t_value = /*item*/ ctx[2].fields.title + "")) set_data_dev(t, t_value);

			if (dirty & /*items*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[2].path)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(7:2) {#if item.type == filter}",
		ctx
	});

	return block;
}

// (6:2) {#each items as item}
function create_each_block(ctx) {
	let if_block_anchor;
	let if_block = /*item*/ ctx[2].type == /*filter*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*item*/ ctx[2].type == /*filter*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(6:2) {#each items as item}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let each_value = /*items*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "grid svelte-v5lmdn");
			add_location(div, file, 4, 0, 48);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*items, filter*/ 3) {
				each_value = /*items*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { items } = $$props, { filter } = $$props;
	const writable_props = ["items", "filter"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Grid> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Grid", $$slots, []);

	$$self.$set = $$props => {
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
		if ("filter" in $$props) $$invalidate(1, filter = $$props.filter);
	};

	$$self.$capture_state = () => ({ items, filter });

	$$self.$inject_state = $$props => {
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
		if ("filter" in $$props) $$invalidate(1, filter = $$props.filter);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [items, filter];
}

class Grid extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { items: 0, filter: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Grid",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*items*/ ctx[0] === undefined && !("items" in props)) {
			console.warn("<Grid> was created without expected prop 'items'");
		}

		if (/*filter*/ ctx[1] === undefined && !("filter" in props)) {
			console.warn("<Grid> was created without expected prop 'filter'");
		}
	}

	get items() {
		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get filter() {
		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set filter(value) {
		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* layout/content/index.svelte generated by Svelte v3.20.1 */
const file$1 = "layout/content/index.svelte";

function create_fragment$1(ctx) {
	let h1;
	let t0;
	let t1;
	let section;
	let p;
	let t2;
	let a;
	let t4;
	let t5;
	let h3;
	let t7;
	let current;

	const grid = new Grid({
			props: {
				items: /*allNodes*/ ctx[1],
				filter: "blog"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text(/*name*/ ctx[0]);
			t1 = space();
			section = element("section");
			p = element("p");
			t2 = text("Visit the ");
			a = element("a");
			a.textContent = "Svelte tutorial";
			t4 = text(" to learn how to build Svelte apps.");
			t5 = space();
			h3 = element("h3");
			h3.textContent = "Recent blog posts:";
			t7 = space();
			create_component(grid.$$.fragment);
			add_location(h1, file$1, 6, 0, 108);
			attr_dev(a, "href", "https://svelte.dev/tutorial");
			add_location(a, file$1, 8, 14, 159);
			add_location(p, file$1, 8, 1, 146);
			add_location(h3, file$1, 9, 1, 257);
			attr_dev(section, "id", "intro");
			add_location(section, file$1, 7, 0, 124);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, section, anchor);
			append_dev(section, p);
			append_dev(p, t2);
			append_dev(p, a);
			append_dev(p, t4);
			append_dev(section, t5);
			append_dev(section, h3);
			append_dev(section, t7);
			mount_component(grid, section, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
			const grid_changes = {};
			if (dirty & /*allNodes*/ 2) grid_changes.items = /*allNodes*/ ctx[1];
			grid.$set(grid_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(grid.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(grid.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(section);
			destroy_component(grid);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { name } = $$props;
	let { allNodes } = $$props;
	const writable_props = ["name", "allNodes"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Content> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Content", $$slots, []);

	$$self.$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("allNodes" in $$props) $$invalidate(1, allNodes = $$props.allNodes);
	};

	$$self.$capture_state = () => ({ name, allNodes, Grid });

	$$self.$inject_state = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("allNodes" in $$props) $$invalidate(1, allNodes = $$props.allNodes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [name, allNodes];
}

class Content extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { name: 0, allNodes: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Content",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
			console.warn("<Content> was created without expected prop 'name'");
		}

		if (/*allNodes*/ ctx[1] === undefined && !("allNodes" in props)) {
			console.warn("<Content> was created without expected prop 'allNodes'");
		}
	}

	get name() {
		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allNodes() {
		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allNodes(value) {
		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Content;
//# sourceMappingURL=index-108e6574.js.map
