module.exports = function (sequelize, Sequelize) {

var Household_Address = sequelize.define('household_address', {
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
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_street2: {
        type: Sequelize.STRING,
        allowNull: false
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
        allowNull: false
    },
    cmpd_division: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    cmpd_response_area: {
        type: Sequelize.STRING,
        defaultValue: null
    },

  });
  return Household_Address;
};
