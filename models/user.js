module.exports = function(sequelize, Sequelize) {
    var EncryptedField = require('sequelize-encrypted');
    // secret key should be 32 bytes hex encoded (64 characters)
    var key = "53E19CAB12F077ECDCC03C01BC621C8E950F9198C568A41A6DFDCE2E2D155469";
    var enc_fields = EncryptedField(Sequelize, key);
    
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        encrypted: enc_fields.vault('encrypted'),
        eggo: enc_fields.field('eggo', {
            type: Sequelize.TEXT,
            defaultValue: null
        }),
    });
    return User;
}
