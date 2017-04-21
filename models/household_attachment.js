module.exports = function (sequelize, Sequelize) {

    var Household_Attachment = sequelize.define('household_attachment', {
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
        owner_user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            //TODO: Fix foreign key issue
            //references: {
              //model: user,
              //key: 'id'
            //}
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
    return Household_Attachment;
};
