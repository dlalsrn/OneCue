const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('auth_code', {
        phone: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        rand_code: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        uID: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
    };
    return schema;
})