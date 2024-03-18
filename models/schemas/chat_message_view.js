const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('chat_message_view', {

    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.chat_message_view.belongsTo(models.chat_message, {
            foreignKey: 'message_id',
            onDelete: "CASCADE",
        })
        models.chat_message_view.belongsTo(models.user, {
            foreignKey: 'view_user_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})