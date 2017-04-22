module.exports = Sequelize => ({
    name: 'household_attachment',
    fields: {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    associate: function(attachment, db) {
        attachment.belongsTo(db.household);
        attachment.belongsTo(db.user, {as: 'owner'});
    }
});
