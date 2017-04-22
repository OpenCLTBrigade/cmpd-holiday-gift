module.exports = Sequelize => ({
    name: 'child',
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
        last4ssn: {
            type: Sequelize.STRING,
            allowNull: false
        },
        free_or_reduced_lunch: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        reason_for_nomination: {
            type: Sequelize.STRING,
            allowNull: false
        },
        school_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_address2: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_city: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_state: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_zip: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        bike_want: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bike_size: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        bike_style: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        clothes_want: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        clothes_size_shirt: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        clothes_size_pants: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        shoe_size: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        favourite_colour: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        interests: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        additional_ideas: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        school_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        gender: {
            type: Sequelize.STRING,
            defaultValue: null
        },
    },
    associate: function (child, db) {
        child.belongsTo(db.household);
    }
});
