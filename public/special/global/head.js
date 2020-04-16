/* generated by Svelte v3.20.1 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../web_modules/svelte/internal.js";

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
	let t5;
	let link2;

	return {
		c() {
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
			t5 = space();
			link2 = element("link");
			attr(meta0, "charset", "utf-8");
			attr(meta1, "name", "viewport");
			attr(meta1, "content", "width=device-width,initial-scale=1");
			attr(link0, "href", "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,700;1,300&display=swap");
			attr(link0, "rel", "stylesheet");
			attr(link1, "rel", "icon");
			attr(link1, "type", "image/png");
			attr(link1, "href", "/favicon.png");
			attr(link2, "rel", "stylesheet");
			attr(link2, "href", "/special/bundle.css");
		},
		m(target, anchor) {
			insert(target, head, anchor);
			append(head, meta0);
			append(head, t0);
			append(head, meta1);
			append(head, t1);
			append(head, title_1);
			append(title_1, t2);
			append(head, t3);
			append(head, link0);
			append(head, t4);
			append(head, link1);
			append(head, t5);
			append(head, link2);
		},
		p(ctx, [dirty]) {
			if (dirty & /*title*/ 1) set_data(t2, /*title*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(head);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { title } = $$props;

	$$self.$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
	};

	return [title];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { title: 0 });
	}
}

export default Component;