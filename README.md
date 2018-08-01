# CMPD Explorers Christmas Project 2018

This application, developed by [Code for Charlotte], helps automate
the [CMPD Explorers Christmas Project].

# Get Involved

* [Check out our project page on Laddr](https://brigade.opencharlotte.org/projects/cmpd_explorers_christmas_project)
* [Join the discussion and review additional documentation on Discourse](https://forum.opencharlotte.org/c/active-projects/cmpd-explorers-christmas-project)

# Start Developing

Node 8 is **required**. We recommend at least Node 8.9.4. We also recommend using [nvm](https://github.com/creationix/nvm) (MacOS / Linux) to install and use the appropriate version of Node on a per-project basis.

You'll also need to use [yarn](https://yarnpkg.com) instead of npm. Install it using `npm install -g yarn` from the project directory (so it
gets installed for the appropriate Node version).

See [Dependencies Documentation](#dependencies-documentation) below for more information
on the dependencies we use.

* Install lerna globally `yarn global add lerna`
* Clone from github: `git clone https://github.com/CodeForCharlotte/cmpd-holiday-gift.git && cd cmpd-holiday-gift`
* If using nvm, run `nvm use` to ensure you're using the appropriate Node version for the project. `nvm install 8.9.4` if you don't have the appropriate version installed already.
* Run `yarn` to install the dependencies.
* In the root project directory, copy `env.example.js` to `env.js`. You _don't_ need to make any changes just yet.
* Run `yarn start-client` to start the front-end in development mode. Access the application at http://localhost:3000.
* In a separate terminal (re-run `nvm use` if needed) run `yarn start-server` to start the back-end in development mode. The back end runs on port 3001 and the development mode front-end server will act as a reverse proxy for it. If you get an error saying you need to install sqlite3 manually, run `yarn add sqlite3`.
* From `backend/nominations-api` run `yarn seed` to populate the DB.

Read [Front end development notes here](#front-end-development).

Read [Back end development notes here](#back-end-development).

## Troubleshooting

### Resetting your database

When you pull changes to the database schema or sample data the application may stop working. When this occurs you need
to delete the SQLite database in `run/` and restart your server instance. After restarting the server be sure to
seed the database using `yarn run seed`. You should now be good to keep going!

--- 

# Build for Production

To prepare the server for production, run `yarn run build`.

Optionally run `yarn prune --production`.

Start the production-mode server with `NODE_ENV=production yarn run start-server`

---

# Front-end development

Static assets are in `public/`. The react apps are under `frontend/applications`.

---

# Back end development

We use Firebase for user management and phone-based authentication. You will need a `service-account-key.json` file from Firebase under `backend/nominations-api`. Contact
@AndrewNatoli or @chimon2000 for more information on getting started.

The entire backend source is in `backend/`. `nominations-api` is the main application and also
includes controllers for the nomination system to use. Additional modules such as `adoption-module` 
contain controllers and models for their corresponding frontends. `common` contains models and utils
that are likely shared among modules. 

Optionally, set up a [mailtrap.io] account if you are working on
emails. Put your account info in `env.js` (see `env.example.js` for an
example).

Seed database from `backend/nominations-api`: `yarn` seed`

Why we chose Node.js over PHP: https://medium.com/fuzz/php-a0d0b1d365d8

## Back End Configuration

This section needs revision

## Models / Entities

We use [TypeORM](http://typeorm.io/#/).

Base models shared between frontend implementations are defined in `backend/common/src/entities`.

Entities defined in the `common` module are directly used to populate the database. You'll need to reset
your SQLite database after making changes to entities. 

We also use entities to filter fields from being exposed in API responses. For example, `AdoptableChild` 
under `adoption-module` uses the `Child` table but restricts fields from being exposed in the response.

### Encrypted Fields

We are required to encrypt personally identifiable information in the database. Refer to the `child`
entity under `common` when you need to do this.

# Dependencies Documentation

The backend is a [NestJS] application written in [TypeScript] and uses [TypeORM] for database interaction.[ES6 features] are used.

Authentication is powered by Firebase. More info on that coming soon.

For development, data is stored in an [Sqlite] database.

Email is sent using [nodemailer]. Email templates are rendered with
[Mustache]. For development, we use [mailtrap.io] to test sending
emails. <-- This might be outdated information.

The nominations frontend is written with [React]. It is scaffolded using
[create-react-app]. The theme is [AdminLTE], based on
[Bootstrap 3]. To use bootstrap components, use [react-bootstrap].
We're using [styled-components] for custom styles (in place of LESS / SCSS).

The admin and adoption applications have a similar stack but use [TypeScript].

Coding style is enforced by [eslint].

# Get Involved

* Join us on Slack: http://codeforcharlotte.org/slack
* Slack channel: https://codeforclt.slack.com/messages/C0A7A7C6L/
* Issue tracker: https://codeforcharlotte.atlassian.net/wiki/display/GIFT/CMPD+Winter+Gift+Project
* Work with us in-person at our next MeetUp! https://www.meetup.com/Code-For-Charlotte/

[code for charlotte]: http://www.codeforcharlotte.org/
[cmpd explorers christmas project]: http://charlottenc.gov/CMPD/Organization/Pages/SupportSvcs/Explorer_XmasProject.aspx
[node]: https://nodejs.org/dist/latest-v6.x/docs/api/
[express]: https://expressjs.com/en/4x/api.html
[es6 features]: https://github.com/lukehoban/es6features
[express-jwt]: https://github.com/auth0/express-jwt
[node-jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[bcrypt]: https://en.wikipedia.org/wiki/Bcrypt
[sqlite]: https://sqlite.org/docs.html
[sequelize]: http://docs.sequelizejs.com/en/v3/
[sequelize-encrpyted]: https://github.com/defunctzombie/sequelize-encrypted
[mailtrap.io]: https://mailtrap.io
[nodemailer]: https://nodemailer.com/
[react]: https://facebook.github.io/react/
[react-bootstrap]: https://react-bootstrap.github.io/
[styled-components]: https://github.com/styled-components/styled-components
[create-react-app]: https://github.com/facebookincubator/create-react-app
[adminlte]: https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html
[bootstrap 3]: http://getbootstrap.com/getting-started/
[jasmine]: https://jasmine.github.io/1.3/introduction
[eslint]: http://eslint.org/docs/user-guide/getting-started
[nodejs 7]: https://nodejs.org/en/download/current/
[mustache]: https://www.npmjs.com/package/mustache
[eslint]: https://eslint.org/docs/user-guide/getting-started
[nestjs]: https://nestjs.com/
[typeorm]: http://typeorm.io/
[typescript]: http://www.typescriptlang.org/