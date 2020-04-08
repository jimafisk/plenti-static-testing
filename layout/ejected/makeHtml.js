import injectIntoHead from './inject.js';
import relative from 'require-relative';

import 'svelte/register.js';

const renderHtml = input => {
  /* eslint-disable-next-line global-require */
  const Comp = relative(input, process.cwd()).default;
  return Comp.render();
};

const makeHtmlWithStyle = inputs =>
  inputs
    .map(renderHtml)
    .map(rendered =>
      injectIntoHead(`\n<style>${rendered.css.code}</style>\n`)(rendered.html),
    );

export default makeHtmlWithStyle;
