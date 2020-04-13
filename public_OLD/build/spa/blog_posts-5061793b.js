
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, b as validate_slots, g as element, t as text, o as space, j as add_location, h as attr_dev, c as insert_dev, l as append_dev, m as set_data_dev, n as noop, f as detach_dev } from './main-7fffe8dd.js';

/* layout/content/blog_posts.svelte generated by Svelte v3.20.1 */

const file = "layout/content/blog_posts.svelte";

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let p0;
	let em;
	let t3;
	let div2;
	let div0;
	let strong0;
	let span0;
	let t5;
	let t6;
	let div1;
	let strong1;
	let span1;
	let t8;
	let t9;
	let p1;
	let a;

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text(/*title*/ ctx[0]);
			t1 = space();
			p0 = element("p");
			em = element("em");
			em.textContent = "Blog template";
			t3 = space();
			div2 = element("div");
			div0 = element("div");
			strong0 = element("strong");
			strong0.textContent = "Title: ";
			span0 = element("span");
			t5 = text(/*title*/ ctx[0]);
			t6 = space();
			div1 = element("div");
			strong1 = element("strong");
			strong1.textContent = "Desc: ";
			span1 = element("span");
			t8 = text(/*description*/ ctx[1]);
			t9 = space();
			p1 = element("p");
			a = element("a");
			a.textContent = "Back home";
			add_location(h1, file, 4, 0, 52);
			add_location(em, file, 5, 3, 72);
			add_location(p0, file, 5, 0, 69);
			add_location(strong0, file, 7, 7, 112);
			add_location(span0, file, 7, 31, 136);
			add_location(div0, file, 7, 2, 107);
			add_location(strong1, file, 8, 7, 170);
			add_location(span1, file, 8, 30, 193);
			add_location(div1, file, 8, 2, 165);
			add_location(div2, file, 6, 0, 99);
			attr_dev(a, "href", "/");
			add_location(a, file, 11, 3, 237);
			add_location(p1, file, 11, 0, 234);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, p0, anchor);
			append_dev(p0, em);
			insert_dev(target, t3, anchor);
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, strong0);
			append_dev(div0, span0);
			append_dev(span0, t5);
			append_dev(div2, t6);
			append_dev(div2, div1);
			append_dev(div1, strong1);
			append_dev(div1, span1);
			append_dev(span1, t8);
			insert_dev(target, t9, anchor);
			insert_dev(target, p1, anchor);
			append_dev(p1, a);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
			if (dirty & /*title*/ 1) set_data_dev(t5, /*title*/ ctx[0]);
			if (dirty & /*description*/ 2) set_data_dev(t8, /*description*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p0);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(div2);
			if (detaching) detach_dev(t9);
			if (detaching) detach_dev(p1);
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
	let { title } = $$props, { description } = $$props;
	const writable_props = ["title", "description"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Blog_posts> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Blog_posts", $$slots, []);

	$$self.$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("description" in $$props) $$invalidate(1, description = $$props.description);
	};

	$$self.$capture_state = () => ({ title, description });

	$$self.$inject_state = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
		if ("description" in $$props) $$invalidate(1, description = $$props.description);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [title, description];
}

class Blog_posts extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { title: 0, description: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Blog_posts",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<Blog_posts> was created without expected prop 'title'");
		}

		if (/*description*/ ctx[1] === undefined && !("description" in props)) {
			console.warn("<Blog_posts> was created without expected prop 'description'");
		}
	}

	get title() {
		throw new Error("<Blog_posts>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Blog_posts>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get description() {
		throw new Error("<Blog_posts>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set description(value) {
		throw new Error("<Blog_posts>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Blog_posts;
//# sourceMappingURL=blog_posts-5061793b.js.map
