# CMPD Explorers 2017

This application, developed by [Code for Charlotte], helps automate
the [CMPD Explorers Christmas Project].

## Usage

Run `npm install` to install the dependencies.

Then run `npm start` to start the server in development mode. Access
the application on http://localhost:3000.

## Development

[NodeJS 7] is required.

Install dependencies: `npm install`

Optionally, set up a [mailtrap.io] account. Put your account info in
`env.js` (see `env.example.js` for an example).

Run app, and restart when code changes: `npm run nodemon`

Seed database: `node seeds`

Run tests: `npm test`

Check and fix code style: `npm run lint`

Why we chose Node.js over PHP: https://medium.com/fuzz/php-a0d0b1d365d8

### Local Configuration

`config/env.default.js` includes default values. You can copy
`env.example.js` to `env.js` to override defaults.

## Contact

* Slack account registration: https://codeforclt.typeform.com/to/wcYsrE
* Slack channel: https://codeforclt.slack.com/messages/C0A7A7C6L/
* Issue tracker: https://codeforcharlotte.atlassian.net/wiki/display/GIFT/CMPD+Winter+Gift+Project

## Dependencies Documentation

The backend is an [Express] application running in [Node]. Some newer
[ES6 features] are used.

Authentication is provided by [Passport]. Passwords are encrypted using [bcrypt].

Data is stored in an [Sqlite] database using the [Sequelize] ORM. Some of
the fields are encrypted using [sequelize-encrpyted].

Email is sent using [nodemailer]. Email templates are rendered with
[Mustache]. For development, we use [mailtrap.io] to test sending
emails.

The frontend is written in [Vue] and [Less]. It is assembled using
[Webpack] and [vue-loader]. The theme is [AdminLTE], based on
[Bootstrap 3].

Tests are run using [Jasmine]. Coding style is enforced by [eslint].

[Code for Charlotte]: http://www.codeforcharlotte.org/
[CMPD Explorers Christmas Project]: http://charlottenc.gov/CMPD/Organization/Pages/SupportSvcs/Explorer_XmasProject.aspx
[Node]: https://nodejs.org/dist/latest-v6.x/docs/api/
[Express]: https://expressjs.com/en/4x/api.html
[ES6 features]: https://github.com/lukehoban/es6features
[Passport]: http://passportjs.org/docs
[bcrypt]: https://en.wikipedia.org/wiki/Bcrypt
[Sqlite]: https://sqlite.org/docs.html
[Sequelize]: http://docs.sequelizejs.com/en/v3/
[sequelize-encrpyted]: https://github.com/defunctzombie/sequelize-encrypted
[mailtrap.io]: https://mailtrap.io
[nodemailer]: https://nodemailer.com/
[Vue]: https://vuejs.org/v2/api/
[Less]: http://lesscss.org/features/
[Webpack]: https://webpack.js.org/
[vue-loader]: https://vue-loader.vuejs.org/en/
[AdminLTE]: https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html
[Bootstrap 3]: http://getbootstrap.com/getting-started/
[Jasmine]: https://jasmine.github.io/1.3/introduction
[eslint]: http://eslint.org/docs/user-guide/getting-started
[NodeJS 7]: https://nodejs.org/en/download/current/
[Mustache]: https://www.npmjs.com/package/mustache
