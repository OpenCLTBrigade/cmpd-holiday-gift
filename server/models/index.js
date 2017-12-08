'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const encrypted = require('sequelize-encrypted');

import * as affiliation from './affiliation';
import * as child from './child';
import * as householdAddress from './household_address';
import * as householdAttachment from './household_attachment';
import * as householdPhone from './household_phone';
import * as household from './household';
import * as user from './user';
import * as session from './session';

const models = [
  affiliation,
  child,
  householdAddress,
  householdAttachment,
  householdPhone,
  household,
  user,
  session
]

import config from '../config';

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
        },
        define: { underscored: true }
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

    const encryptedFields = [];

    function encrypt_field(field, schema) {
      if (!encrypt) {
        encrypt = encrypted(Sequelize, config.databaseEncryptionKey);
        model['vault'] = encrypt.vault('vault');
      }
      encryptedFields.push(field);
      return encrypt.field(field);
    }

    // Note which fields are private and bind them to the model
    const privateFields = [];

    Object.keys(model).forEach(function (field) {
      if (model[field].encrypt) {
        model[field] = encrypt_field(field, model[field]);
      }
      if (model[field].private) {
        privateFields.push(field);
      }
    });

    const newModel = sequelize.define(name, model, {
      defaultScope,
      scopes
    });

    newModel.prototype.privateFields = privateFields;
    newModel.prototype.encryptedFields = encryptedFields;

    // GIFT-210 && GIFT-158
    newModel.prototype.toJSON = function () {
      // Encryption vault is NOT in dataValues

      const values = Object.assign({}, this.dataValues, (this.vault) ? this.vault : {});
      
      this.privateFields.forEach(field => {
        delete values[field];
      });

      if (values.vault) {
        delete values.vault;
      }

      if (this.vault) {
        delete this.vault;
      }

      return values;

    };

    return newModel;
  }

  // This model loader is different from the Sequelize sample project
  // Each module is passed only the `Sequelize` object, not `sequelize`
  // Modules in this folder should export an object with the following fields:
  // - name: the table name
  // - fields: sequelize field definitions (additionally accepting `encrypted: true`)
  // - associate (optional): a function that takes the current table and the database object,
  //   and performs associations such as `belongsTo`

  models.forEach((model) => {
    const table = model(Sequelize);
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

db.sequelize = sequelize;

db.test = {
  open: path => loadModels(connect({
    storage: path,
    dialect: 'sqlite',
    logging: false
  }))
};

db.sync = sequelize.sync.bind(sequelize);
db.Sequelize = Sequelize;

export default db;