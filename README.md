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

Set up a mailtrap.io account. Copy `./config/env_example.js` to `./config/env_development.js`, then edit the file with your
mailtrap account details.

Run app, and restart when code changes: `npm run nodemon`

Seed database: `node seeds`

Run tests: `npm test`

Check and fix code style: `npm run lint`

Why we chose Node.js over PHP: https://medium.com/fuzz/php-a0d0b1d365d8

### Advanced configuration

`./config/index.js` includes default values. Some defaults are specific to `production`, `testing`, and `development`.

You can copy `./config/env_shared_example.js` to `./config/env_shared.js` to override defaults across all environments.

Copy `./config/env_example.js` to `./config/env_[environment].js` to override settings for that specific environment.

The `env_[environment].js` values override any colliding `env_shared.js` values in that particular environment.

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

Email in development environment is sent through mailtrap.io. A mailtrap account
will be required to test email services.

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
[Vue]: https://vuejs.org/v2/api/
[Less]: http://lesscss.org/features/
[Webpack]: https://webpack.js.org/
[vue-loader]: https://vue-loader.vuejs.org/en/
[AdminLTE]: https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html
[Bootstrap 3]: http://getbootstrap.com/getting-started/
[Jasmine]: https://jasmine.github.io/1.3/introduction
[eslint]: http://eslint.org/docs/user-guide/getting-started
[NodeJS 7]: https://nodejs.org/en/download/current/
