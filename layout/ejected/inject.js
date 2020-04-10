const prependString = elementString => content => html =>
  html.replace(elementString, content + elementString);

const appendString = elementString => content => html =>
  html.replace(elementString, elementString + content);

const injectIntoHead = prependString('</head>');
const injectHtmlAttribute = appendString('<html');

export {injectIntoHead, injectHtmlAttribute};
