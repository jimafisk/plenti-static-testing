const makeInjectString = beforeString => content => html =>
  html.replace(beforeString, content + beforeString);

const injectIntoHead = makeInjectString('</head>');

export default injectIntoHead;
