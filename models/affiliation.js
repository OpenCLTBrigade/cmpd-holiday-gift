module.exports = function (sequelize, Sequelize) {

    var Affiliation = sequelize.define('affiliation', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_street2: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        address_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_zip: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
    });
    return Affiliation;
};
