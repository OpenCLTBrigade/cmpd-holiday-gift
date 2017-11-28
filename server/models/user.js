// TODO: toJSON should not include password hash, vault and other fields

module.exports = Sequelize => ({
  name: 'user',
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
    name_last: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true
    },
    rank: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      private: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    nomination_limit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    confirmation_email: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    confirmation_code: {
      type: Sequelize.STRING,
      defaultValue: null,
      private: true
    },
    email_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  scopes: {
    filteredByUser: function (user) {
      if (user.role !== 'admin') {
        // Pro-tip: If your where clause competes with the scope, the where-clause wins
        return { where: { id: user.id } };
      }
      return {};
    }
  },
  associate: function (user, db) {
    user.belongsTo(db.affiliation, { foreignKey: 'affiliation_id' });
    user.hasMany(db.household, { as: 'nomination', foreignKey: 'nominator_id' });
  }
});
