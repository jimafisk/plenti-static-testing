import injectIntoHead from './inject.js';
import relative from 'require-relative';

import 'svelte/register.js';

const renderHtml = (input, Route, node, allNodes) => {
  /* eslint-disable-next-line global-require */
  const component = relative(input, process.cwd()).default;
  let props = {};
  props.Route = Route;
  props.node = node;
  props.allNodes = allNodes;
  return component.render(props);
};

const makeHtml = inputs =>
  inputs
    .map(input => renderHtml(input.src, input.route, input.node, input.nodes))
    .map(rendered =>
      injectIntoHead(`\n<style>${rendered.css.code}</style>\n`)(rendered.html),
    );

export default makeHtml;
