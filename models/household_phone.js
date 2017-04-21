module.exports = function (sequelize, Sequelize) {

    var Household_Phone = sequelize.define('household_phone', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        household_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            //TODO: Fix foreign key issue
            //references: {
              //model: household,
              //key: 'id'
            //}
        },
        phone_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
    return Household_Phone;
};
