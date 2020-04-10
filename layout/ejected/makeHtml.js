import {injectIntoHead, injectHtmlAttribute} from './inject.js';
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
    .map(rendered => {
      let renderedWithHead = injectIntoHead(`
  <style>${rendered.css.code}</style>
  <script type="module" src="https://unpkg.com/dimport?module" data-main="/build/spa/main.js"></script>
  <script nomodule src="https://unpkg.com/dimport/nomodule" data-main="/build/spa/main.js"></script>
      `)(rendered.html);
      return injectHtmlAttribute(` id="hydrate-plenti"`)(renderedWithHead);
    });

export default makeHtml;
