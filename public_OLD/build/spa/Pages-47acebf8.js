
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, g as validate_each_argument, v as validate_slots, e as element, t as text, l as attr_dev, b as add_location, c as insert_dev, m as append_dev, p as set_data_dev, f as detach_dev, j as space, h as empty, n as noop, w as destroy_each } from './main-75e10430.js';

/* layout/content/Pages.svelte generated by Svelte v3.20.1 */

const file = "layout/content/Pages.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (15:0) {#each allNodes as node}
function create_each_block(ctx) {
	let a;
	let t_value = /*node*/ ctx[3].fields.title + "";
	let t;
	let a_href_value;

	const block = {
		c: function create() {
			a = element("a");
			t = text(t_value);
			attr_dev(a, "href", a_href_value = /*node*/ ctx[3].path);
			add_location(a, file, 15, 1, 297);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*allNodes*/ 1 && t_value !== (t_value = /*node*/ ctx[3].fields.title + "")) set_data_dev(t, t_value);

			if (dirty & /*allNodes*/ 1 && a_href_value !== (a_href_value = /*node*/ ctx[3].path)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(15:0) {#each allNodes as node}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let p;
	let t3;
	let a;
	let t5;
	let div;
	let strong0;
	let span0;
	let t7;
	let t8;
	let strong1;
	let span1;
	let t10;
	let t11;
	let h3;
	let t13;
	let each_1_anchor;
	let each_value = /*allNodes*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text(/*title*/ ctx[1]);
			t1 = space();
			p = element("p");
			p.textContent = "Pages template";
			t3 = space();
			a = element("a");
			a.textContent = "Back home";
			t5 = space();
			div = element("div");
			strong0 = element("strong");
			strong0.textContent = "Title:";
			span0 = element("span");
			t7 = text(/*title*/ ctx[1]);
			t8 = space();
			strong1 = element("strong");
			strong1.textContent = "Desc:";
			span1 = element("span");
			t10 = text(/*description*/ ctx[2]);
			t11 = space();
			h3 = element("h3");
			h3.textContent = "All nodes test:";
			t13 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			add_location(h1, file, 5, 0, 74);
			add_location(p, file, 6, 0, 91);
			attr_dev(a, "href", "/");
			add_location(a, file, 7, 0, 113);
			add_location(strong0, file, 9, 0, 145);
			add_location(span0, file, 9, 23, 168);
			add_location(strong1, file, 10, 0, 189);
			add_location(span1, file, 10, 22, 211);
			add_location(div, file, 8, 0, 139);
			add_location(h3, file, 13, 0, 246);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, p, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, a, anchor);
			insert_dev(target, t5, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, strong0);
			append_dev(div, span0);
			append_dev(span0, t7);
			append_dev(div, t8);
			append_dev(div, strong1);
			append_dev(div, span1);
			append_dev(span1, t10);
			insert_dev(target, t11, anchor);
			insert_dev(target, h3, anchor);
			insert_dev(target, t13, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);
			if (dirty & /*title*/ 2) set_data_dev(t7, /*title*/ ctx[1]);
			if (dirty & /*description*/ 4) set_data_dev(t10, /*description*/ ctx[2]);

			if (dirty & /*allNodes*/ 1) {
				each_value = /*allNodes*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(a);
			if (detaching) detach_dev(t5);
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t11);
			if (detaching) detach_dev(h3);
			if (detaching) detach_dev(t13);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
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
	let { allNodes } = $$props;
	let { title } = $$props, { description } = $$props;
	const writable_props = ["allNodes", "title", "description"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Pages> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Pages", $$slots, []);

	$$self.$set = $$props => {
		if ("allNodes" in $$props) $$invalidate(0, allNodes = $$props.allNodes);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
		if ("description" in $$props) $$invalidate(2, description = $$props.description);
	};

	$$self.$capture_state = () => ({ allNodes, title, description });

	$$self.$inject_state = $$props => {
		if ("allNodes" in $$props) $$invalidate(0, allNodes = $$props.allNodes);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
		if ("description" in $$props) $$invalidate(2, description = $$props.description);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [allNodes, title, description];
}

class Pages extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { allNodes: 0, title: 1, description: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Pages",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*allNodes*/ ctx[0] === undefined && !("allNodes" in props)) {
			console.warn("<Pages> was created without expected prop 'allNodes'");
		}

		if (/*title*/ ctx[1] === undefined && !("title" in props)) {
			console.warn("<Pages> was created without expected prop 'title'");
		}

		if (/*description*/ ctx[2] === undefined && !("description" in props)) {
			console.warn("<Pages> was created without expected prop 'description'");
		}
	}

	get allNodes() {
		throw new Error("<Pages>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allNodes(value) {
		throw new Error("<Pages>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<Pages>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Pages>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get description() {
		throw new Error("<Pages>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set description(value) {
		throw new Error("<Pages>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Pages;
//# sourceMappingURL=Pages-47acebf8.js.map
