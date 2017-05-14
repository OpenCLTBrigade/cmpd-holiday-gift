// Copy this to env_production.js / env_testing.js / env_development.js as  needed
// This overrides config/index.js values as well as env_shared.js values
module.exports = {
    email: {
    // Email (Use MailTrap.io for dev)
        host: 'smtp.mailtrap.io',
        port: 2525,
        user: '',
        pass: ''
    },
    db: {}
};
