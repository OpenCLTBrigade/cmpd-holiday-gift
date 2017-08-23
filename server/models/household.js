const config = require('../config');

module.exports = Sequelize => ({
  name: 'household',
  fields: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name_first: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name_middle: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    name_last: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    race: {
      type: Sequelize.ENUM,
      values: config.raceOptions,
      defaultValue: null
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    last4ssn: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    preferred_contact_method: {
      type: Sequelize.STRING,
      allowNull: false
    },
    draft: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    case_number: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    nomination_email_sent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reviewed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    nominator_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    deleted_at: {
      type: Sequelize.DATE,
      defaultValue: null
    }
  },
  scopes: {
    filteredByUser: function (user) {
      if (user.role !== 'admin') {
        return { where: { nominator_user_id: user.id } };
      }
      return {};
    }
  },
  associate: function (household, db) {
    household.belongsTo(db.user, { as: 'nominator' });
    household.hasMany(db.child, { as: 'children' });
    household.hasOne(db.household_address, { as: 'address' });
  }
});
