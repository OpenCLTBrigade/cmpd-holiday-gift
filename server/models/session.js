module.exports = Sequelize => ({
  name: 'session',
  fields: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    }
  },
  associate: function(session, db) {
    session.belongsTo(db.user, { foreignKey: 'user_id' });
  }
});
