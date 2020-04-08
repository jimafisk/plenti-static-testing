import injectIntoHead from './inject.js';
import relative from 'require-relative';

import 'svelte/register.js';

const renderHtml = (input, Route, node, allNodes) => {
  /* eslint-disable-next-line global-require */
  const Comp = relative(input, process.cwd()).default;
  console.log('route is: ' + Route);
  console.log('node is: ' + JSON.stringify(node));
  console.log('All nodes are: ' + JSON.stringify(allNodes));
  let props = {};
  props.Route = Route;
  props.node = node;
  props.allNodes = allNodes;
  return Comp.render(props);
};

//const makeHtmlWithStyle = (inputs, Route, node, allNodes) =>
const makeHtmlWithStyle = inputs =>
  //inputs.forEach(input 
  inputs
    //.map(input => renderHtml(input, Route, node, allNodes))
    .map(input => renderHtml(input.src, input.route, input.node, input.nodes))
    .map(rendered =>
      injectIntoHead(`\n<style>${rendered.css.code}</style>\n`)(rendered.html),
    );

export default makeHtmlWithStyle;
