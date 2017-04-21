module.exports = function (sequelize, Sequelize) {
    var EncryptedField = require('sequelize-encrypted');
    // secret key should be 32 bytes hex encoded (64 characters)
    var key = '53E19CAB12F077ECDCC03C01BC621C8E950F9198C568A41A6DFDCE2E2D155469'; // TODO: move key to secrets file
    var enc_fields = EncryptedField(Sequelize, key);

    var User = sequelize.define('user', {
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
        affiliation_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            //TODO: Fix foreign key issue
            //references: {
            //  model: affiliation,
            //  key: 'id'
            //}
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
        username: {
          type: Sequelize.TEXT
        },
        encrypted: enc_fields.vault('encrypted'),
        eggo: enc_fields.field('eggo', {
            type: Sequelize.TEXT,
            defaultValue: null
        }),
    });
    return User;
};
