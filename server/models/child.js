const moment = require('moment');

const config = require('../config');

module.exports = Sequelize => ({
  name: 'child',
  fields: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name_first: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true,
    },
    name_middle: {
      type: Sequelize.STRING,
      defaultValue: null,
      encrypt: true,
    },
    // We can't encrypt last names due to search
    name_last: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: false,
      encrypt: true,
      get() {
        const dob = this.getDataValue('dob');

        return moment(dob).format('YYYY-MM-DD');
      }
    },
    race: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    last4ssn: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    free_or_reduced_lunch: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    reason_for_nomination: {
      type: Sequelize.STRING,
      allowNull: false
    },
    school_id: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    bike_want: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bike_size: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    bike_style: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    clothes_want: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    clothes_size_shirt: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    clothes_size_pants: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    clothes_size_coat: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    shoe_size: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    favourite_colour: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    interests: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    additional_ideas: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    gender: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    age: {
      type: Sequelize.VIRTUAL,
      get: function () {
        return moment().diff(this.dob, 'years');
      }
    },
    name_full: {
      type: Sequelize.VIRTUAL,
      get: function () {
        return `${this.name_first} ${this.name_last}`;
      }
    }
  },
  associate: function (child, db) {
    child.belongsTo(db.household);
  }
});
