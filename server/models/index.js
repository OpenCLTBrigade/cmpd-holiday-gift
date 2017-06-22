'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var encrypted = require('sequelize-encrypted');

var config = require('../config');

var db = {};

var sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  Object.assign(
    {
      // TODO: move pool settings to config file
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    },
    config.db
  )
);

var associations = [];

// A wrapper around sequelize.define that handles encrypted fields
// - fields marked `encrypted: true` are encrypted using `sequelize-encrypted`
// - a 'vault' column is added if necessary to store the encrypted fields
function define_table(name, model) {
  var encrypt = null;

  function encrypt_field(column) {
    if (!encrypt) {
      encrypt = encrypted(Sequelize, config.databaseEncryptionKey);
      model['vault'] = encrypt.vault('vault');
    }
    return encrypt.field(column);
  }

  let privateFields = [];

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
        var values = Object.assign({}, this.dataValues);
        privateFields.forEach(field => {
          delete values[field];
        });
        return values;
      }
    }
  });
}

// This model loader is different from the Seqeulize sample project
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
    var table = require(path.join(__dirname, file))(Sequelize);
    db[table.name] = define_table(table.name, table.fields);
    if (table.associate2) {
      associations.push(() => table.associate(db[table.name], db));
    }
  });

associations.forEach(associate => associate());

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
