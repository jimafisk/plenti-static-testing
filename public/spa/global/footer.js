/* generated by Svelte v3.20.1 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../web_modules/svelte/internal/index.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (8:6) {#if node.fields.title}
function create_if_block(ctx) {
	let a;
	let t0_value = /*node*/ ctx[1].fields.title + "";
	let t0;
	let a_href_value;
	let t1;

	return {
		c() {
			a = element("a");
			t0 = text(t0_value);
			t1 = text(" ");
			attr(a, "href", a_href_value = /*node*/ ctx[1].path);
		},
		m(target, anchor) {
			insert(target, a, anchor);
			append(a, t0);
			insert(target, t1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*allNodes*/ 1 && t0_value !== (t0_value = /*node*/ ctx[1].fields.title + "")) set_data(t0, t0_value);

			if (dirty & /*allNodes*/ 1 && a_href_value !== (a_href_value = /*node*/ ctx[1].path)) {
				attr(a, "href", a_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(a);
			if (detaching) detach(t1);
		}
	};
}

// (7:4) {#each allNodes as node}
function create_each_block(ctx) {
	let if_block_anchor;
	let if_block = /*node*/ ctx[1].fields.title && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (/*node*/ ctx[1].fields.title) {
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
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let footer;
	let div;
	let span;
	let t1;
	let each_value = /*allNodes*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			footer = element("footer");
			div = element("div");
			span = element("span");
			span.textContent = "All nodes:";
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "container");
			attr(footer, "class", "svelte-n69rq5");
		},
		m(target, anchor) {
			insert(target, footer, anchor);
			append(footer, div);
			append(div, span);
			append(div, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*allNodes*/ 1) {
				each_value = /*allNodes*/ ctx[0];
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
		d(detaching) {
			if (detaching) detach(footer);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { allNodes } = $$props;

	$$self.$set = $$props => {
		if ("allNodes" in $$props) $$invalidate(0, allNodes = $$props.allNodes);
	};

	return [allNodes];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { allNodes: 0 });
	}
}

export default Component;