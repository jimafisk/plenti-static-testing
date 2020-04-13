
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set() {
        // overridden by instance, if it has props
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach(node);
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else
        dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev("SvelteDOMSetData", { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error(`'target' is a required option`);
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn(`Component was already destroyed`); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

function convert (str, loose) {
	if (str instanceof RegExp) return { keys:false, pattern:str };
	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
	arr[0] || arr.shift();

	while (tmp = arr.shift()) {
		c = tmp[0];
		if (c === '*') {
			keys.push('wild');
			pattern += '/(.*)';
		} else if (c === ':') {
			o = tmp.indexOf('?', 1);
			ext = tmp.indexOf('.', 1);
			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
		} else {
			pattern += '/' + tmp;
		}
	}

	return {
		keys: keys,
		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
	};
}

function Navaid(base, on404) {
	var rgx, routes=[], $={};

	var fmt = $.format = function (uri) {
		if (!uri) return uri;
		uri = '/' + uri.replace(/^\/|\/$/g, '');
		return rgx.test(uri) && uri.replace(rgx, '/');
	};

	base = '/' + (base || '').replace(/^\/|\/$/g, '');
	rgx = base == '/' ? /^\/+/ : new RegExp('^\\' + base + '(?=\\/|$)\\/?', 'i');

	$.route = function (uri, replace) {
		if (uri[0] == '/' && !rgx.test(uri)) uri = base + uri;
		history[(replace ? 'replace' : 'push') + 'State'](uri, null, uri);
	};

	$.on = function (pat, fn) {
		(pat = convert(pat)).fn = fn;
		routes.push(pat);
		return $;
	};

	$.run = function (uri) {
		var i=0, params={}, arr, obj;
		if (uri = fmt(uri || location.pathname)) {
			uri = uri.match(/[^\?#]*/)[0];
			for (; i < routes.length; i++) {
				if (arr = (obj=routes[i]).pattern.exec(uri)) {
					for (i=0; i < obj.keys.length;) {
						params[obj.keys[i]] = arr[++i] || null;
					}
					obj.fn(params); // todo loop?
					return $;
				}
			}
			if (on404) on404(uri);
		}
		return $;
	};

	$.listen = function (u) {
		wrap('push');
		wrap('replace');

		function run(e) {
			$.run();
		}

		function click(e) {
			var x = e.target.closest('a'), y = x && x.getAttribute('href');
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button || e.defaultPrevented) return;
			if (!y || x.target || x.host !== location.host) return;
			if (y[0] != '/' || rgx.test(y)) {
				e.preventDefault();
				$.route(y);
			}
		}

		addEventListener('popstate', run);
		addEventListener('replacestate', run);
		addEventListener('pushstate', run);
		addEventListener('click', click);

		$.unlisten = function () {
			removeEventListener('popstate', run);
			removeEventListener('replacestate', run);
			removeEventListener('pushstate', run);
			removeEventListener('click', click);
		};

		return $.run(u);
	};

	return $;
}

function wrap(type, fn) {
	if (history[type]) return;
	history[type] = type;
	fn = history[type += 'State'];
	history[type] = function (uri) {
		var ev = new Event(type.toLowerCase());
		ev.uri = uri;
		fn.apply(this, arguments);
		return dispatchEvent(ev);
	};
}

// TODO: This file is temporary and needs to be removed at some point.
// It should get automatically generated by plenti based on the "content/" folder.
const nodes = [
    {
        "path": "/blog/post1",
        "type": "blog",
        "filename": "post1.json",
        "fields": {
            "title": "Post 1",
            "description": "First blog post."
        }
    },
    {
        "path": "/blog/post2",
        "type": "blog",
        "filename": "post2.json",
        "fields": {
            "title": "Post 2",
            "description": "Second blog post."
        }
    },
    {
        "path": "/blog/post3",
        "type": "blog",
        "filename": "post-3_has_a_long_filename.json",
        "fields": {
            "title": "Post 3",
            "description": "Third of the blog posts."
        }
    },
    {
        "path": "/about",
        "type": "pages",
        "filename": "about.json",
        "fields": {
            "title": "About Page",
            "description": "This is the about page"
        }
    },
    {
        "path": "/anything",
        "type": "pages",
        "filename": "anything.json",
        "fields": {
            "title": "Anything!",
            "description": "The amazing anything page..."
        }
    },
    {
        "path": "/",
        "type": "index",
        "filename": "_index.json",
        "fields": {
            "name": "Plenti"
        }
    }
];

class DataSource {

  constructor() {}

  static getNode(uri) {
    let content;
    nodes.map(node => {
      if (node.path == uri) {
        content = node;
      }
    });
    return content ? content : '';
  }

  static getAllNodes() {
    let content = nodes.map(node => {
      return node;
    });
    return content;
  }
}

/* layout/global/head.svelte generated by Svelte v3.20.1 */

const file = "layout/global/head.svelte";

function create_fragment(ctx) {
	let head;
	let meta0;
	let t0;
	let meta1;
	let t1;
	let title_1;
	let t2;
	let t3;
	let link0;
	let t4;
	let link1;

	const block = {
		c: function create() {
			head = element("head");
			meta0 = element("meta");
			t0 = space();
			meta1 = element("meta");
			t1 = space();
			title_1 = element("title");
			t2 = text(/*title*/ ctx[0]);
			t3 = space();
			link0 = element("link");
			t4 = space();
			link1 = element("link");
			attr_dev(meta0, "charset", "utf-8");
			add_location(meta0, file, 5, 2, 49);
			attr_dev(meta1, "name", "viewport");
			attr_dev(meta1, "content", "width=device-width,initial-scale=1");
			add_location(meta1, file, 6, 2, 74);
			add_location(title_1, file, 8, 2, 145);
			attr_dev(link0, "rel", "icon");
			attr_dev(link0, "type", "image/png");
			attr_dev(link0, "href", "/favicon.png");
			add_location(link0, file, 10, 2, 173);
			attr_dev(link1, "rel", "stylesheet");
			attr_dev(link1, "href", "/build/bundle.css");
			add_location(link1, file, 11, 2, 230);
			add_location(head, file, 4, 0, 40);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, head, anchor);
			append_dev(head, meta0);
			append_dev(head, t0);
			append_dev(head, meta1);
			append_dev(head, t1);
			append_dev(head, title_1);
			append_dev(title_1, t2);
			append_dev(head, t3);
			append_dev(head, link0);
			append_dev(head, t4);
			append_dev(head, link1);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 1) set_data_dev(t2, /*title*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(head);
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
	let { title } = $$props;
	const writable_props = ["title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Head> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Head", $$slots, []);

	$$self.$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
	};

	$$self.$capture_state = () => ({ title });

	$$self.$inject_state = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [title];
}

class Head extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { title: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Head",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
			console.warn("<Head> was created without expected prop 'title'");
		}
	}

	get title() {
		throw new Error("<Head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* layout/global/nav.svelte generated by Svelte v3.20.1 */

const file$1 = "layout/global/nav.svelte";

function create_fragment$1(ctx) {
	let nav;
	let span;
	let a0;
	let t1;
	let a1;
	let t3;
	let a2;

	const block = {
		c: function create() {
			nav = element("nav");
			span = element("span");
			a0 = element("a");
			a0.textContent = "Home";
			t1 = space();
			a1 = element("a");
			a1.textContent = "About";
			t3 = space();
			a2 = element("a");
			a2.textContent = "Anything";
			attr_dev(a0, "href", "/");
			add_location(a0, file$1, 1, 19, 25);
			attr_dev(span, "id", "brand");
			add_location(span, file$1, 1, 2, 8);
			attr_dev(a1, "href", "/about");
			add_location(a1, file$1, 2, 2, 55);
			attr_dev(a2, "href", "/anything");
			add_location(a2, file$1, 3, 2, 84);
			add_location(nav, file$1, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, span);
			append_dev(span, a0);
			append_dev(nav, t1);
			append_dev(nav, a1);
			append_dev(nav, t3);
			append_dev(nav, a2);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
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

function instance$1($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Nav", $$slots, []);
	return [];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$1.name
		});
	}
}

/* layout/global/scripts.svelte generated by Svelte v3.20.1 */

const makeTitle = filename => {
	if (filename == "_index.json") {
		return "Home";
	} else if (filename) {
		// Remove file extension.
		filename = filename.split(".").slice(0, -1).join(".");

		// Convert underscores and hyphens to spaces.
		filename = filename.replace(/_|-/g, " ");

		// Capitalize first letter of each word.
		filename = filename.split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
	}

	return filename;
};

/* layout/global/html.svelte generated by Svelte v3.20.1 */
const file$2 = "layout/global/html.svelte";

function create_fragment$2(ctx) {
	let html;
	let t0;
	let body;
	let t1;
	let main;
	let details;
	let summary;
	let t3;
	let pre;
	let t4;
	let t5;
	let current;

	const head = new Head({
			props: {
				title: makeTitle(/*node*/ ctx[1].filename)
			},
			$$inline: true
		});

	const nav = new Nav({ $$inline: true });
	const switch_instance_spread_levels = [/*node*/ ctx[1].fields, { allNodes: /*allNodes*/ ctx[2] }];
	var switch_value = /*Route*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			html = element("html");
			create_component(head.$$.fragment);
			t0 = space();
			body = element("body");
			create_component(nav.$$.fragment);
			t1 = space();
			main = element("main");
			details = element("details");
			summary = element("summary");
			summary.textContent = "Click to show Route class";
			t3 = space();
			pre = element("pre");
			t4 = text(/*Route*/ ctx[0]);
			t5 = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			add_location(summary, file$2, 14, 6, 280);
			add_location(pre, file$2, 15, 6, 331);
			add_location(details, file$2, 13, 4, 264);
			add_location(main, file$2, 12, 2, 253);
			add_location(body, file$2, 10, 0, 234);
			attr_dev(html, "lang", "en");
			add_location(html, file$2, 8, 0, 175);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, html, anchor);
			mount_component(head, html, null);
			append_dev(html, t0);
			append_dev(html, body);
			mount_component(nav, body, null);
			append_dev(body, t1);
			append_dev(body, main);
			append_dev(main, details);
			append_dev(details, summary);
			append_dev(details, t3);
			append_dev(details, pre);
			append_dev(pre, t4);
			append_dev(main, t5);

			if (switch_instance) {
				mount_component(switch_instance, main, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			const head_changes = {};
			if (dirty & /*node*/ 2) head_changes.title = makeTitle(/*node*/ ctx[1].filename);
			head.$set(head_changes);
			if (!current || dirty & /*Route*/ 1) set_data_dev(t4, /*Route*/ ctx[0]);

			const switch_instance_changes = (dirty & /*node, allNodes*/ 6)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*node*/ 2 && get_spread_object(/*node*/ ctx[1].fields),
					dirty & /*allNodes*/ 4 && { allNodes: /*allNodes*/ ctx[2] }
				])
			: {};

			if (switch_value !== (switch_value = /*Route*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, main, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(head.$$.fragment, local);
			transition_in(nav.$$.fragment, local);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(head.$$.fragment, local);
			transition_out(nav.$$.fragment, local);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(html);
			destroy_component(head);
			destroy_component(nav);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { Route } = $$props, { node } = $$props, { allNodes } = $$props;
	const writable_props = ["Route", "node", "allNodes"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Html> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Html", $$slots, []);

	$$self.$set = $$props => {
		if ("Route" in $$props) $$invalidate(0, Route = $$props.Route);
		if ("node" in $$props) $$invalidate(1, node = $$props.node);
		if ("allNodes" in $$props) $$invalidate(2, allNodes = $$props.allNodes);
	};

	$$self.$capture_state = () => ({
		Head,
		Nav,
		makeTitle,
		Route,
		node,
		allNodes
	});

	$$self.$inject_state = $$props => {
		if ("Route" in $$props) $$invalidate(0, Route = $$props.Route);
		if ("node" in $$props) $$invalidate(1, node = $$props.node);
		if ("allNodes" in $$props) $$invalidate(2, allNodes = $$props.allNodes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [Route, node, allNodes];
}

class Html extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { Route: 0, node: 1, allNodes: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Html",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*Route*/ ctx[0] === undefined && !("Route" in props)) {
			console.warn("<Html> was created without expected prop 'Route'");
		}

		if (/*node*/ ctx[1] === undefined && !("node" in props)) {
			console.warn("<Html> was created without expected prop 'node'");
		}

		if (/*allNodes*/ ctx[2] === undefined && !("allNodes" in props)) {
			console.warn("<Html> was created without expected prop 'allNodes'");
		}
	}

	get Route() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set Route(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get node() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set node(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allNodes() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allNodes(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* layout/ejected/client_router.svelte generated by Svelte v3.20.1 */

function create_fragment$3(ctx) {
	let current;

	const html = new Html({
			props: {
				Route: /*Route*/ ctx[0],
				node: /*node*/ ctx[1],
				allNodes: /*allNodes*/ ctx[2]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(html.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(html, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const html_changes = {};
			if (dirty & /*Route*/ 1) html_changes.Route = /*Route*/ ctx[0];
			if (dirty & /*node*/ 2) html_changes.node = /*node*/ ctx[1];
			if (dirty & /*allNodes*/ 4) html_changes.allNodes = /*allNodes*/ ctx[2];
			html.$set(html_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(html.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(html.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(html, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
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
	const router = Navaid("/").on("/", () => import('./index-53064620.js').then(draw)).on("/:slug", () => import('./pages-ebb4d803.js').then(draw)).on("/blog/:slug", () => import('./blog_posts-2b262403.js').then(draw)).listen();
	onDestroy(router.unlisten);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Client_router> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Client_router", $$slots, []);

	$$self.$capture_state = () => ({
		Navaid,
		DataSource,
		onDestroy,
		Html,
		Route,
		node,
		allNodes,
		uri,
		draw,
		track,
		router
	});

	$$self.$inject_state = $$props => {
		if ("Route" in $$props) $$invalidate(0, Route = $$props.Route);
		if ("node" in $$props) $$invalidate(1, node = $$props.node);
		if ("allNodes" in $$props) $$invalidate(2, allNodes = $$props.allNodes);
		if ("uri" in $$props) uri = $$props.uri;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [Route, node, allNodes];
}

class Client_router extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Client_router",
			options,
			id: create_fragment$3.name
		});
	}
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/jim-service-worker.js')
  .then((reg) => {
    console.log('Service Worker registration succeeded.');
  }).catch((error) => {
    console.log('Service Worker registration failed with ' + error);
  });
} else {
  console.log('Service Workers not supported by browser');
}

const replaceContainer = function ( Component, options ) {
  const frag = document.createDocumentFragment();
  const component = new Component( Object.assign( {}, options, { target: frag } ));
  if (options.target) {
    options.target.replaceWith( frag );
  }
  return component;
};

const app = replaceContainer( Client_router, {
  target: document.querySelector( '#hydrate-plenti' ),
  props: {}
});

export { SvelteComponentDev as S, app as a, space as b, attr_dev as c, dispatch_dev as d, element as e, add_location as f, insert_dev as g, append_dev as h, init as i, detach_dev as j, validate_each_argument as k, empty as l, create_component as m, noop as n, mount_component as o, set_data_dev as p, transition_in as q, transition_out as r, safe_not_equal as s, text as t, destroy_component as u, validate_slots as v, destroy_each as w };
//# sourceMappingURL=main-c8d75d94.js.map
