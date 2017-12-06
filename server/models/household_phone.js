module.exports = Sequelize => ({
  name: 'household_phone',
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
    number: {
      type: Sequelize.STRING,
      allowNull: false,
      encrypt: true
    },
    household_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  associate: function(phone, db) {
    phone.belongsTo(db.household);
  }
});
