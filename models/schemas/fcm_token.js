const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('fcm_token', {
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.fcm_token.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})