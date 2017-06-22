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
            allowNull: false,
            private: true
        },
        remember_token: {
            type: Sequelize.STRING,
            defaultValue: null,
            private: true
        },
        logged_in_at: {
            type: Sequelize.DATE,
            defaultValue: null,
            private: true
        },
        logged_out_at: {
            type: Sequelize.DATE,
            defaultValue: null,
            private: true
        },
        ip_address: {
            type: Sequelize.STRING,
            defaultValue: null,
            private: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            private: true
        },
        nomination_limit: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 5,
            private: true
        },
        confirmation_email: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            private: true
        },
        confirmation_code: {
            type: Sequelize.STRING,
            defaultValue: null,
            private: true
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            private: true
        },
        declined: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            private: true
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
