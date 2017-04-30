// TODO: toJSON should not include password hash, vault and other fields

module.exports = Sequelize => ({
    name: 'user',
    fields: {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name_first: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name_last: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rank: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {isEmail: true}
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        remember_token: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logged_in_at: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        logged_out_at: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        ip_address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        nomination_limit: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        confirmation_email: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        confirmation_code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        declined: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        username: {type: Sequelize.TEXT},
        encryption_test: {
            type: Sequelize.TEXT,
            defaultValue: null,
            encrypted: true
        }
    },
    associate: function (user, db) {
        user.belongsTo(db.affiliation, {foreignKey: 'affiliation_id'});
    }
});
