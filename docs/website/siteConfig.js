/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/logo.gif',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'CMPD Explorers Christmas Project' /* title for your website */,
  tagline: 'Documentation Website',
  url: 'https://github.com/CodeForCharlotte/cmpd-holiday-gift' /* your website url */,
  baseUrl: '/docs/' /* base url for your project */,
  projectName: 'cmpd-docs',
  headerLinks: [
    {doc: 'doc1', label: 'Docs'},
    {doc: 'doc2', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo.gif',
  footerIcon: 'img/logo.gif',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#00355d',
    secondaryColor: '#00355d',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Code for Charlotte',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/CodeForCharlotte/cmpd-holiday-gift',
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
};

module.exports = siteConfig;
