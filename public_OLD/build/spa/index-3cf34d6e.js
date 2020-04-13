
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, b as space, c as attr_dev, f as add_location, g as insert_dev, h as append_dev, n as noop, j as detach_dev, k as validate_each_argument, l as empty, t as text, m as create_component, o as mount_component, p as set_data_dev, q as transition_in, r as transition_out, u as destroy_component, w as destroy_each } from './main-f093cd78.js';

/* layout/components/grid.svelte generated by Svelte v3.20.1 */

const file = "layout/components/grid.svelte";

function create_fragment(ctx) {
	let div3;
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;

	const block = {
		c: function create() {
			div3 = element("div");
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			t1 = space();
			div2 = element("div");
			attr_dev(div0, "class", "grid-item green svelte-11t5aph");
			add_location(div0, file, 1, 2, 21);
			attr_dev(div1, "class", "grid-item red svelte-11t5aph");
			add_location(div1, file, 2, 2, 59);
			attr_dev(div2, "class", "grid-item blue svelte-11t5aph");
			add_location(div2, file, 3, 2, 95);
			attr_dev(div3, "class", "grid svelte-11t5aph");
			add_location(div3, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div0);
			append_dev(div3, t0);
			append_dev(div3, div1);
			append_dev(div3, t1);
			append_dev(div3, div2);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
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

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Grid> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Grid", $$slots, []);
	return [];
}

class Grid extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Grid",
			options,
			id: create_fragment.name
		});
	}
}

/* layout/content/index.svelte generated by Svelte v3.20.1 */
const file$1 = "layout/content/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (13:2) {#if node.type == 'blog'}
function create_if_block(ctx) {
	let a;
	let t0_value = /*node*/ ctx[2].fields.title + "";
	let t0;
	let a_href_value;
	let t1;
	let br;

	const block = {
		c: function create() {
			a = element("a");
			t0 = text(t0_value);
			t1 = space();
			br = element("br");
			attr_dev(a, "href", a_href_value = /*node*/ ctx[2].path);
			add_location(a, file$1, 13, 3, 355);
			add_location(br, file$1, 14, 3, 404);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, br, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*allNodes*/ 2 && t0_value !== (t0_value = /*node*/ ctx[2].fields.title + "")) set_data_dev(t0, t0_value);

			if (dirty & /*allNodes*/ 2 && a_href_value !== (a_href_value = /*node*/ ctx[2].path)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(br);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(13:2) {#if node.type == 'blog'}",
		ctx
	});

	return block;
}

// (12:2) {#each allNodes as node}
function create_each_block(ctx) {
	let if_block_anchor;
	let if_block = /*node*/ ctx[2].type == "blog" && create_if_block(ctx);

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
			if (/*node*/ ctx[2].type == "blog") {
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
		source: "(12:2) {#each allNodes as node}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let section;
	let h1;
	let t0;
	let t1;
	let t2;
	let p;
	let t3;
	let a;
	let t5;
	let t6;
	let h3;
	let t8;
	let current;
	const grid = new Grid({ $$inline: true });
	let each_value = /*allNodes*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			section = element("section");
			h1 = element("h1");
			t0 = text(/*name*/ ctx[0]);
			t1 = space();
			create_component(grid.$$.fragment);
			t2 = space();
			p = element("p");
			t3 = text("Visit the ");
			a = element("a");
			a.textContent = "Svelte tutorial";
			t5 = text(" to learn how to build Svelte apps.");
			t6 = space();
			h3 = element("h3");
			h3.textContent = "Recent blog posts:";
			t8 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(h1, file$1, 7, 1, 130);
			attr_dev(a, "href", "https://svelte.dev/tutorial");
			add_location(a, file$1, 9, 14, 171);
			add_location(p, file$1, 9, 1, 158);
			add_location(h3, file$1, 10, 1, 269);
			attr_dev(section, "id", "intro");
			add_location(section, file$1, 6, 0, 108);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, h1);
			append_dev(h1, t0);
			append_dev(section, t1);
			mount_component(grid, section, null);
			append_dev(section, t2);
			append_dev(section, p);
			append_dev(p, t3);
			append_dev(p, a);
			append_dev(p, t5);
			append_dev(section, t6);
			append_dev(section, h3);
			append_dev(section, t8);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(section, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);

			if (dirty & /*allNodes*/ 2) {
				each_value = /*allNodes*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(section, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
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
			if (detaching) detach_dev(section);
			destroy_component(grid);
			destroy_each(each_blocks, detaching);
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
//# sourceMappingURL=index-3cf34d6e.js.map
