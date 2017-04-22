module.exports = Sequelize => ({
    name: 'household_phone',
    fields: {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        phone_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    associate: function (phone, db) {
        phone.belongsTo(db.household);
    }
});
