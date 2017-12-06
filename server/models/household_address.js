module.exports = Sequelize => ({
  name: 'household_address',
  fields: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    street2: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    zip: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    cmpd_division: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    cmpd_response_area: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    shipping_note: {
      type: Sequelize.STRING,
      defaultValue: null
    }
  },
  associate: function (address, db) {
    address.belongsTo(db.household);
  }
});
