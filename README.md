# CMPD Explorers 2017

This application, developed by [Code for Charlotte], helps automate
the [CMPD Explorers Christmas Project].

## Usage

Run `npm install` to install the dependencies.

### Run front end
Then run `npm start` to start the front end in development mode. Access
the application on http://localhost:3000.

### Run back end
In a separate terminal, run `npm run server-nodemon` to start the back end in development mode. The back end
runs at http://localhost:3001 but the front end does not need to be configured to use the different port. Port
forwarding is handled by `proxy` in the `package.json` :)

## Development

[NodeJS 7] is required.

Install dependencies: `npm install`

### Front end development

...

### Back end development

Work in the `/server` directory.

Optionally, set up a [mailtrap.io] account. Put your account info in
`env.js` (see `env.example.js` for an example).

Seed database: `node seeds`

Run tests: `npm test` <-- Not working yet

Check and fix code style: `npm run lint` <-- Not working yet

Why we chose Node.js over PHP: https://medium.com/fuzz/php-a0d0b1d365d8

### Local Configuration - Back end

`server/config/env.default.js` includes default values. You can copy
`server/env.example.js` to `server/env.js` to override defaults.

### Data tables

We *were* using [vutable-2](https://github.com/ratiw/vuetable-2). Stand by for readme updates when we
complete replacing it.

* [Documentation](https://github.com/ratiw/vuetable-2)
* [More in-depth documentation / tutorial](https://github.com/ratiw/vuetable-2-tutorial)
* [Sample API Endpoint](https://github.com/ratiw/vuetable-2-tutorial/wiki/prerequisite#sample-api-endpoint)

### Models

#### Private Fields
Add `private: true` to a field definition to prevent it from being output as JSON in API responses.

#### Encrypted Fields


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

The frontend is written with [React]. It is assembled using
[create-react-app]. The theme is [AdminLTE], based on
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
[react]: https://facebook.github.io/react/
[create-react-app]: https://github.com/facebookincubator/create-react-app
[AdminLTE]: https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html
[Bootstrap 3]: http://getbootstrap.com/getting-started/
[Jasmine]: https://jasmine.github.io/1.3/introduction
[eslint]: http://eslint.org/docs/user-guide/getting-started
[NodeJS 7]: https://nodejs.org/en/download/current/
[Mustache]: https://www.npmjs.com/package/mustache
