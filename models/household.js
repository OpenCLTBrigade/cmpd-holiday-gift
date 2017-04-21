module.exports = function (sequelize, Sequelize) {

    var Household = sequelize.define('household', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nominator_user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            //TODO: Fix foreign key issue
            //references: {
              //model: user,
              //key: 'id'
            //}
        },
        name_first: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name_middle: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        name_last: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.STRING,
            allowNull: false
        },
        race: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last4ssn: {
            type: Sequelize.STRING,
            allowNull: false
        },
        preferred_contact_method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        draft: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        case_number: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        nomination_email_sent: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reviewed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        deleted_at: {
            type: Sequelize.DATE,
            defaultValue: null
        },

    });
    return Household;
};
