'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const encrypted = require('sequelize-encrypted');

const config = require('../config');

function connect(dbConfig) {
  return new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    Object.assign(
      {
        // TODO: move pool settings to config file
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      },
      dbConfig
    )
  );
}

function loadModels(sequelize) {
  const db = {};
  const associations = [];

  // A wrapper around sequelize.define that handles encrypted fields
  // - fields marked `encrypted: true` are encrypted using `sequelize-encrypted`
  // - a 'vault' column is added if necessary to store the encrypted fields
  function define_table(name, model, scopes, defaultScope) {
    let encrypt = null;

    function encrypt_field(column) {
      if (!encrypt) {
        encrypt = encrypted(Sequelize, config.databaseEncryptionKey);
        model['vault'] = encrypt.vault('vault');
      }
      return encrypt.field(column);
    }

    // Note which fields are private and bind them to the model
    const privateFields = [];

    Object.keys(model).forEach(function (field) {
      if (model[field].encrypted) {
        model[field] = encrypt_field(model[field]);
      }
      if (model[field].private) {
        privateFields.push(field);
      }
    });

    return sequelize.define(name, model, {
      instanceMethods: {
        toJSON: function () {
          const values = Object.assign({}, this.dataValues);
          privateFields.forEach(field => {
            delete values[field];
          });
          return values;
        }
      },
      defaultScope,
      scopes
    });
  }

  // This model loader is different from the Sequelize sample project
  // Each module is passed only the `Sequelize` object, not `sequelize`
  // Modules in this folder should export an object with the following fields:
  // - name: the table name
  // - fields: sequelize field definitions (additionally accepting `encrypted: true`)
  // - associate (optional): a function that takes the current table and the database object,
  //   and performs associations such as `belongsTo`
  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function (file) {
      const table = require(path.join(__dirname, file))(Sequelize);
      db[table.name] = define_table(table.name, table.fields, table.scopes, table.defaultScope);
      if (table.associate) {
        associations.push(() => table.associate(db[table.name], db));
      }
    });

  associations.forEach(associate => associate());

  return db;
}

const sequelize = connect(config.db);
const db = loadModels(sequelize);

db.test = {
  open: path => loadModels(connect({
    storage: path,
    dialect: 'sqlite',
    logging: false
  }))
};

db.sync = sequelize.sync.bind(sequelize);
db.Sequelize = Sequelize;

module.exports = db;
