
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, b as add_location, c as insert_dev, n as noop, f as detach_dev, t as text, g as space, h as create_component, j as attr_dev, k as append_dev, m as mount_component, l as set_data_dev, o as transition_in, p as transition_out, q as destroy_component } from './main-ad9b5bb1.js';

/* layout/content/Component.svelte generated by Svelte v3.20.1 */

const file = "layout/content/Component.svelte";

function create_fragment(ctx) {
	let h1;

	const block = {
		c: function create() {
			h1 = element("h1");
			h1.textContent = "Hi!!!";
			add_location(h1, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Component> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Component", $$slots, []);
	return [];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});
	}
}

/* layout/content/Index.svelte generated by Svelte v3.20.1 */
const file$1 = "layout/content/Index.svelte";

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
	let current;
	const component = new Component({ $$inline: true });

	const block = {
		c: function create() {
			section = element("section");
			h1 = element("h1");
			t0 = text(/*name*/ ctx[0]);
			t1 = space();
			create_component(component.$$.fragment);
			t2 = space();
			p = element("p");
			t3 = text("Visit the ");
			a = element("a");
			a.textContent = "Svelte tutorial";
			t5 = text(" to learn how to build Svelte apps.");
			t6 = space();
			h3 = element("h3");
			h3.textContent = "Recent blog posts:";
			add_location(h1, file$1, 7, 1, 128);
			attr_dev(a, "href", "https://svelte.dev/tutorial");
			add_location(a, file$1, 9, 14, 174);
			add_location(p, file$1, 9, 1, 161);
			add_location(h3, file$1, 10, 1, 272);
			attr_dev(section, "id", "intro");
			add_location(section, file$1, 6, 0, 106);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, h1);
			append_dev(h1, t0);
			append_dev(section, t1);
			mount_component(component, section, null);
			append_dev(section, t2);
			append_dev(section, p);
			append_dev(p, t3);
			append_dev(p, a);
			append_dev(p, t5);
			append_dev(section, t6);
			append_dev(section, h3);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(component.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(component.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_component(component);
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Index> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Index", $$slots, []);

	$$self.$set = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("allNodes" in $$props) $$invalidate(1, allNodes = $$props.allNodes);
	};

	$$self.$capture_state = () => ({ name, allNodes, Component });

	$$self.$inject_state = $$props => {
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("allNodes" in $$props) $$invalidate(1, allNodes = $$props.allNodes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [name, allNodes];
}

class Index extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { name: 0, allNodes: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Index",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
			console.warn("<Index> was created without expected prop 'name'");
		}

		if (/*allNodes*/ ctx[1] === undefined && !("allNodes" in props)) {
			console.warn("<Index> was created without expected prop 'allNodes'");
		}
	}

	get name() {
		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allNodes() {
		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allNodes(value) {
		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Index;
//# sourceMappingURL=Index-b32152b4.js.map
